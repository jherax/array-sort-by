const path = require('path');

const dist = path.resolve(__dirname, 'dist');
const source = path.resolve(__dirname, 'src');
const jsSource = path.resolve(source, 'sort-by.js');
const jsDist = path.resolve(dist, 'sort-by.js');

module.exports = {
  dist,
  source,
  jsSource,
  jsDist,
};
