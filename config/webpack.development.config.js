const { baseDir, src, devPath, assetsPath } = require('./shared')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')

const deployFolder = devPath

module.exports = {
  context: baseDir,
  entry: {
    app: ['@babel/polyfill', path.resolve(src, 'index.js')],
    vendor: ['phaser']
  },
  mode: 'development',
  output: {
    path: deployFolder,
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: src
      },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new CleanWebpackPlugin([deployFolder], {
      root: baseDir
    }),
    new CopyWebpackPlugin([
      { from: assetsPath, to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(baseDir, 'index.html')
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      host: 'localhost',
      port: 3000,
      server: { baseDir: [deployFolder] }
    })
  ]
}
