const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-proj", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log("------ mongodb数据库成功！------");
});

const Plugin = mongoose.model('Plugin', new mongoose.Schema({
  imgPath: { type: String, require: false },
  title: { type: String, require: true },
  tag: { type: String, require: true },
  org: { type: String, require: true },
  desc: { type: String, require: true },
  author: { type: String, require: true }
}))

// 新增数据
Plugin.create({
  imgPath: "/imgs/test.png",
  title: 'test',
  tag: 'vscode_test',
  desc: "aaaaaaa",
  org:"https:www.baidu.com",
  author:"",
}, function (err, doc) {
  if (!err) { } else { }
})

const Models = {
  Plugin
};
module.exports = Models;
