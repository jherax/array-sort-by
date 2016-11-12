/* eslint-disable camelcase */

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const dir_js = path.resolve(__dirname, 'src');
const file_js = path.resolve(dir_js, 'sort-by.js');
const dir_dist = path.resolve(__dirname, 'dist');

// TODO: prevent generate '.min' and '.map' files

const config = {
  // multi-entries: http://ow.ly/PNXR3063UHP
  entry: {
    'sort-by': file_js,
    'sort-by.min': file_js,
  },
  output: {
    path: dir_dist,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'sortBy',
  },
  module: {
    loaders: [{
      test: dir_js,
      loader: 'babel-loader',
    }, {
      test: dir_js,
      loader: 'eslint-loader',
    }],
  },
  eslint: {
    configFile: '.eslintrc.json',
    failOnError: true,
    emitError: false,
    quiet: false,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Search for equal or similar files and deduplicate them in the output
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Note: Don’t use it in watch mode. Only for production builds.
    new webpack.optimize.DedupePlugin(),
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      test: /\.min.js($|\?)/i,
      minimize: true,
    }),
    // plugins are read from bottom to top
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [
        'sort-by.js',
      ],
    }),
  ],

};

module.exports = config;
