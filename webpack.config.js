/* eslint-disable camelcase */

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const validate = require('webpack-validator');
const PATHS = require('./webpack.constants');

const config = {
  entry: {
    'sort-by': PATHS.jsSource,
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'sortBy',
  },
  module: {
    loaders: [{
      loaders: ['babel-loader', 'eslint-loader'],
      test: PATHS.source,
    }],
  },
  // https://github.com/MoOx/eslint-loader
  eslint: {
    configFile: '.eslintrc.json',
    failOnError: true,
    emitError: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Search for equal or similar files and deduplicate them in the output
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Note: Don’t use it in watch mode. Only for production builds.
    new webpack.optimize.DedupePlugin(),
  ],

};

module.exports = validate(config);
