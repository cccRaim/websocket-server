const webpackConfig = require('./webpack.config');
const webpack = require('webpack');


webpack(webpackConfig, function (err, stats) {
  err && console.error(err);
  stats && console.log(stats);
});