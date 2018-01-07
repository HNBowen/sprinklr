var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          presets: ['react', 'es2015', 'env'],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ]
}

module.exports = config;