const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {version} = require('../package.json');
const webpack = require('webpack');
const PATHS = require('./paths');

const banner = `sortBy@v${version}. Jherax 2018. Visit https://github.com/jherax/array-sort-by`;
const jsFiles = /\.min\.js($|\?)/i;

const config = {
  entry: {
    'sort-by': PATHS.source.js,
    'sort-by.min': PATHS.source.js,
    'sort-by-full.min': [PATHS.source.polyfills, PATHS.source.js],
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
    new UglifyJsPlugin({
      test: jsFiles,
      sourceMap: true, // map error message locations to modules
      // https://github.com/mishoo/UglifyJS2#compress-options
      uglifyOptions: {
        compress: {
          warnings: true,
          dead_code: true, // remove unreachable code
          drop_debugger: true,
          drop_console: true,
        },
      },
    }),
    new webpack.BannerPlugin({banner, raw: false, entryOnly: true}),
    // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
    new webpack.SourceMapDevToolPlugin({
      test: jsFiles,
      filename: '[name].map',
      // loaders generate SourceMaps and the source code is used
      module: true,
    }),
  ],
};

module.exports = config;
