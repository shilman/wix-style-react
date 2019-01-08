const fs = require('fs');
const path = require('path');

const listAllComponents = require('../scripts/generate-testkit-exports/list-all-components');

const cwd = path.resolve(__dirname, '..', 'src');
const componentsList = listAllComponents({
  cwd,
});

const defaultOrRoot = object => object.default || object;

const allComponents = componentsList.reduce((a, c) => {
  const ref = require(path.resolve(cwd, c));
  a[c] = defaultOrRoot(ref);
  return a;
}, {});

module.exports = allComponents;
