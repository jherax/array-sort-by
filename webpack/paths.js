const {resolve} = require('path');

const dist = resolve(__dirname, '../dist');
const source = resolve(__dirname, '../src');

module.exports = {
  project: resolve(__dirname, '../'),
  source: {
    folder: source,
    js: resolve(source, 'sort-by.js'),
  },
  dist: {
    folder: dist,
  },
};
