var webpack = require('webpack');
const mdPlugin = require('vite-plugin-markdown')
module.exports = {
  // baseUrl: './',
  publicPath:"./",
  outputDir:"dist",
// assetsPublic:"./",
  devServer: {
    https: false,
    host: "127.0.0.1",
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9003',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
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