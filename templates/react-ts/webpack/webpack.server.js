const { DefinePlugin } = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const dotenv = require('dotenv');
const sharedConfig = require('./webpack.shared');

const config = { ...dotenv.config().parsed };

module.exports = merge(sharedConfig(), {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: path.resolve(__dirname, '../src/server/index'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
  },
  externals: {
    express: "require('express')",
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify({ ...config }),
    }),
  ],
});
