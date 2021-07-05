const express = require('express');
const models = require('./db');
var multer = require('multer');
var path = require("path");
var fs = require('fs');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/login", function (req, res) {
    models.User
        .find({
            username: req.body.username,
            password: req.body.password,
        })
        .then((user) => {
            if (user.length <= 0) {
                res.send({ 'status': 401, 'message': '用户名或密码错误' });
                return
            }
            res.send({ 'status': 200, 'message': '登录成功', 'data': { auth: "admin" } });
        })
})

app.get("/tags", function (req, res) {
    models.Plugin.aggregate([
        { $match: { publish: 1 } },
        { $group: { _id: "$tag" } },
        { $sort: { "_id": 1 } }],
        function (err, datas) {
            if (!err) {
                let tags = []
                datas.forEach(i => {
                    tags.push({ value: i._id, label: i._id, })
                })
                console.log('tags err ---', err, 'tags datas ---', tags);
                res.json({ tags: tags })
            }
        })
})

app.post("/plugins", function (req, res) {
    console.log('req ------', req.body);
    let params = {}
    if (!req.body.title && !req.body.checkTags) {
        console.log('初始化--------------------------------1');
        params = {
            publish: 1,
        }
    }
    if (!req.body.title && req.body.checkTags) {
        if (req.body.checkTags.length != 0) {
            console.log('只选择标签-------------------------------2');
            params = {
                publish: 1,
                tag: { $in: req.body.checkTags }
            }
        }
    }
    if (req.body.title && !req.body.checkTags) {
        console.log('只有标题-------------------------------3');
        params = {
            publish: 1,
            title: { $regex: req.body.title }
        }

    }
    if (req.body.title && req.body.checkTags) {
        if (req.body.checkTags.length != 0) {
            console.log('标题+标签-------------------------------4');
            params = {
                publish: 1,
                title: { $regex: req.body.title },
                tag: { $in: req.body.checkTags }
            }
        }
    }
    let promise1 = new Promise((resolve, reject) => {
        models.Plugin
            .find({ publish: 1 }).countDocuments(params).then((res) => {
                resolve(res)
            })
    })
    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
            .find(params)
            .skip(Number((req.body.page.skip - 1) * req.body.page.limit))
            .limit(Number(req.body.page.limit))
            .exec()
            .then((res) => {
                resolve(res)
            })
    })
    Promise.all([promise1, promise2]).then((datas) => {
        console.log('res -----', { total: datas[0], datas: datas[1] });
        res.json({ total: datas[0], datas: datas[1] })
    }).catch((err) => { console.log('err') })

})

// 临时上传
let upload = multer({ dest: 'tmp_uploads/' });
app.post("/upload", upload.single('file'), function (req, res, next) {
    console.log('upload req ---', req.body);
    let targetPath = req.file.path + "." + req.file.originalname.split(".")[1];

    fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
        if (err) {
            return res.sendResult(null, 400, "上传图片失败");
        }
        res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
    })
    console.log('upload req.file ---', req.file, 'upload url ---', targetPath);
});

// 确认提交
app.post("/submit", upload.single('file'), function (req, res, next) {
    // res.send({ status: 200, message: '测试成功' });
    // 校验
    console.log('submit req ---', req.body);
    // if (!req.body.imgPath || !req.body.title || + !req.body.tag || !req.body.desc) {
    //     return res.send({ status: 412, message: "参数不能为空" })
    // }

    // 提交图片
    let targetPath = 'imgs/' + req.body.title + '.' + req.body.imgPath.split('\\')[1].split('.')[1]
    
    console.log('aaa',aaa);
    
    console.log('4444444444444444444444444！');
    // 插入数据库
        let params = {}
        Object.keys(req.body).forEach((i) => {
            params[i] = req.body[i] || "";
        });
        // params.imgPath = targetPath
        console.log('params', params);

        models.Plugin(req.body).save((err, data) => {
            console.log('err --', err, 'data --', data);
            if (err) {
                return res.send({ status: 401, message: '提交失败', error: err });
            } else {
                let aaa = fs.renameSync(path.join(process.cwd(), "/" + req.body.imgPath), path.join(process.cwd(), '../public/' + targetPath))
                return res.send({ status: 200, message: "提交成功", data: data })

            }
        });
        
});

module.exports = app;
