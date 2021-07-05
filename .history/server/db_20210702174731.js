const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-proj", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log("------ mongodb数据库成功！------");
});

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
}))

const Plugin = mongoose.model('Plugin', new mongoose.Schema({
  imgPath: { type: String, require: false },
  title: { type: String, require: true },
  url: { type: String, require: true },
  tag: { type: String, require: true },
  org: { type: String, require: true },
  desc: { type: String, require: true },
  author: { type: String, require: true },
  auth: { type: String, require: true },
}))

// 新增数据
// Plugin.create({
//   imgPath: "/imgs/test.png",
//   title: 'test',
//   url: 'test',
//   tag: 'vscode_test',
//   desc: "aaaaaaa",
//   org:"https:www.baidu.com",
//   author:"",
//   auth:"admin",
// }, function (err, doc) {
//   if (!err) { } else { }
// })

const Models = {
  User,
  Plugin
};
module.exports = Models;
