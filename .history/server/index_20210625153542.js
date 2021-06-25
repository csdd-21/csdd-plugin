const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();


// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
  })





  app.use(function(req, res, next) {
      console.log('req, res',req, res);
      
    res.send(null, 404, 'Not Found')
  })



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(api);
app.listen('9003', function () {
    console.log("------ node express run in port 9003 ! ------");
})
