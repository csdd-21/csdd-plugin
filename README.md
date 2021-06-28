# csdd-plugin

**A collection of popular and useful plugins or tools for Front-end Engineer 前端常用插件及工具集合**

## 写在最前

项目初衷为在前端的学习和工作中，总是会遇到不错的插件、项目demo，虽然可以在github上收藏、或浏览器收藏夹、或下载到本地保存，尴尬的是，这些文件最后总是难逃一进收藏夹就等着吃灰的命运，所以就有了这个项目最初的开发原因，每次发现不错的demo，像发布文章一样发布到网页上，也供日后方便查找、阅读

原本是想做成点击按钮跳转到自己对插件/工具的简单介绍或使用感受页面，后来想想，对于官网而言，再多余的解释都是苍白无力的，毕竟再详细的介绍都比不上看官网来得直接、确切，所以就只保留对其进行简单说明介绍与跳转至官网的按钮，这样也让自己养成阅读官方的好习惯

总结就是——我们的口号是：我们不生产工具，我们只是工具的搬运工！

当你遇到麻烦时，看官网、看官网、还是看官网，万事不决看官网！

## 快速启动

```
# csdd-plugin根路径
npm i 
npm run serve
# server文件夹（记得先启用mongodb）
nodemon index.js
```

## 前端技术栈

- vue3
- vue-router
- vuex
- axios
- element-plus
- bootstrap
- markdown-it
- less

## 后端技术栈

- node
- express
- mongodb

## 目录结构说明

```
.
├─ README.assets                      项目演示图片资源
│    ├─ 1.gif
│    ├─ 2.gif
│    └─ 3.gif
├─ package.json                       配置、依赖管理
├─ server
│    ├─ api.js                        服务器请求接口封装
│    ├─ db.js                         mongodb数据库封装
│    ├─ index.js                      服务器入口文件
│    ├─ plugins.csv                   （可导入mongodb使用）
│    └─ tmp_uploads                   上传图片临时存储文件夹
├─ src
│    ├─ App.vue
│    ├─ assets
│    │    ├─ allCss                   views、components文件夹下的各个vue单文件对应的less样式
│    │    │    ├─ About.less
│    │    │    ├─ App.less
│    │    │    ├─ FilterCond.less
│    │    │    ├─ Home.less
│    │    │    ├─ New.less
│    │    │    ├─ NotFound.less
│    │    │    └─ Tags.less
│    │    ├─ iconfont
│    │    │    └─ ...
│    │    └─ imgs                     上传图片成功且提交后，文件会保存在该文件夹
│    │           └─ ...
│    ├─ components                    子组件文件夹
│    │    ├─ FilterCond.vue
│    │    ├─ New.vue
│    │    ├─ NotFound.vue
│    │    └─ Tags.vue
│    ├─ main.js
│    ├─ router
│    │    └─ index.js
│    ├─ store
│    │    ├─ actions.js
│    │    ├─ getters.js
│    │    ├─ index.js
│    │    └─ mutations.js
│    └─ views                         页面文件夹
│           ├─ About.vue
│           ├─ Home.vue
│           └─ Test.vue
└─ vue.config.js
```

## 功能演示

- **pc端、移动端页面展示**

![11](README.assets/1.gif)

- **查询、重置、选择标签**

![2](README.assets/2.gif)

- **发布新文章**

![3](README.assets/3.gif)

## 后续功能

- [ ] 线上服务器部署

