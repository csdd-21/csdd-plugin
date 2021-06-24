const express = require('express');
const models = require('./db');
var multer = require('multer');
var path = require("path");
var fs = require('fs');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/tags", function (req, res) {
    models.Plugin.aggregate([{ $group: { _id: "$tag" } }, { $sort: { "_id": 1 } }], function (err, datas) {
        if (!err) {
            let tags = []
            datas.forEach(i => {
                tags.push({
                    value: i._id,
                    label: i._id,
                })
            })
            console.log('tags err ---',err,'tags datas ---',tags);
            res.json({ tags: tags })
        } 
    })
})

app.post("/plugins", function (req, res) {
    // console.log('req ------', req.body);
    let params = {}
    // 初始化
    if (!req.body.title && !req.body.checkTags) {
        console.log('1--------------------------------1');
        params = {}
    }
    // 选择标签
    if (!req.body.title && req.body.checkTags) {
        if (req.body.checkTags.length != 0) {
            console.log('1-------------------------------2');
            params = {
                tag: { $in: req.body.checkTags }
            }
        }
    }
    // 搜索值
    if (req.body.title && req.body.checkTags) {
        if (req.body.checkTags.length != 0) {
            console.log('1-------------------------------3');
            params = {
                title: { $regex: req.body.title },
                tag: { $in: req.body.checkTags }
            }
        }
    }

    let promise1 = new Promise((resolve, reject) => {
        models.Plugin
            .countDocuments(params).then((res) => {
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

module.exports = app;
