var webpack = require('webpack')
var path = require('path')

var APP_DIR = path.resolve(__dirname, 'client/app');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test : /\.js?/,
        include : APP_DIR,
        exclude: ['node-modules'],
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}

module.exports = config;