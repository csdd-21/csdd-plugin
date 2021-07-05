const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(api);
app.use(express.static('./dist'));
// app.use('/api', createProxyMiddleware({
//     target: 'http://127.0.0.1',
//     changeOrigin: true,
//     ws: true,
//     pathRewrite: {
//         '^/api': '/'
//     }
// }));

app.listen('80', function () {
    console.log("------ web server running at http://127.0.0.1 ------");
})
