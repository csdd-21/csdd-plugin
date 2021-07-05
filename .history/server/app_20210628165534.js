const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(express.static('./dist'));
app.use('/api', createProxyMiddleware({ target: 'http://127.0.0.1:9003', changeOrigin: true }));

app.listen('80', function () {
    console.log("------ web server running at http://127.0.0.1 ------");
})
