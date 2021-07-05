var webpack = require('webpack');

module.exports = {
  // publicPath:"./",
  publicPath:"/",
  // publicPath:"C:/Users/86138/Desktop/csdd-server/csdd-plugins-server/server/imgs",
  outputDir:"dist",
  assetsDir: "./static",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9003',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': 'http://127.0.0.1:9003'
        }
      }
    }
  },
  configureWebpack: {
    plugins: 
      [new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })]
   
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}