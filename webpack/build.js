const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const validate = require('webpack-validator');
const {version} = require('../package.json');
const PATHS = require('./paths');

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
    library: 'sortBy', // global var in the browser
  },
  module: {
    loaders: [{
      test: PATHS.source.folder,
      loaders: ['babel-loader', 'eslint-loader'],
    }],
  },
  // https://github.com/MoOx/eslint-loader
  eslint: {
    configFile: '.eslintrc.json',
    failOnWarning: false,
    failOnError: true,
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist.folder], {
      root: PATHS.project,
      verbose: true,
    }),
    // Search for equal or similar files and deduplicate them in the output
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Note: Don’t use it in watch mode. Only for production builds.
    new webpack.optimize.DedupePlugin(),
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      test,
      minimize: true,
      sourceMap: true, // map error message locations to modules
      // https://github.com/mishoo/UglifyJS2#compressor-options
      compress: {
        warnings: true,
        dead_code: true,
        drop_debugger: true,
        drop_console: true,
      },
    }),
    new webpack.BannerPlugin(banner, {raw: false, entryOnly: true}),
    // https://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin
    new webpack.SourceMapDevToolPlugin({
      test,
      filename: '[name].map',
    }),
  ],
};

module.exports = validate(config);
