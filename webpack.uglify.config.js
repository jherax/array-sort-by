/* eslint-disable camelcase */

const webpack = require('webpack');
const validate = require('webpack-validator');
const PATHS = require('./webpack.constants');

const config = {
  entry: {
    'sort-by.min': PATHS.jsDist,
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'sortBy',
  },
  plugins: [
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      test: /\.min.js($|\?)/i,
      minimize: true,
      // https://github.com/mishoo/UglifyJS2#compressor-options
      compress: {
        dead_code: true,
        drop_debugger: true,
        drop_console: true,
      },
    }),
    // https://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [
        'sort-by.js',
      ],
    }),
  ],

};

module.exports = validate(config);
