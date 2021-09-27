const path =  require('path')
const webpackPluginAutoupdate = require("autoupdate-webpack-plugin")
module.exports = {
  mode: 'development',
  entry: './entry.js',
  plugins: [
    new webpackPluginAutoupdate(['vue', 'react'])
  ]
}
