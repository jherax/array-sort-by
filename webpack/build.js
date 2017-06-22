const CleanWebpackPlugin = require('clean-webpack-plugin');
const {version} = require('../package.json');
const webpack = require('webpack');
const PATHS = require('./paths');

/**
 * Should include a version with polyfills?
 *
 * Object.hasOwnProperty
 * Object.defineProperty
 * Array.sort
 */

const banner = `sortBy@v${version}. Jherax 2017. Visit https://github.com/jherax/array-sort-by`;
const test = /\.min.js($|\?)/i;

const config = {
  entry: {
    'sort-by': PATHS.source.js,
    'sort-by.min': PATHS.source.js,
  },
  output: {
    path: PATHS.dist.folder,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'sortBy', // global
  },
  module: {
    rules: [
      {
        test: PATHS.source.folder,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: PATHS.source.folder,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          // https://github.com/MoOx/eslint-loader
          configFile: '.eslintrc.json',
          failOnWarning: false,
          failOnError: true,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist.folder], {
      root: PATHS.project,
      verbose: true,
    }),
    // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    new webpack.optimize.UglifyJsPlugin({
      test,
      sourceMap: true, // map error message locations to modules
      // https://github.com/mishoo/UglifyJS2#compress-options
      compress: {
        warnings: true,
        dead_code: true,
        drop_debugger: true,
        drop_console: true,
      },
    }),
    new webpack.BannerPlugin({banner, raw: false, entryOnly: true}),
    // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
    new webpack.SourceMapDevToolPlugin({
      test,
      filename: '[name].map',
      // loaders generate SourceMaps and the source code is used
      module: true,
    }),
  ],
};

module.exports = config;
