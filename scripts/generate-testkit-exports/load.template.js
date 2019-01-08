const load = path => {
  const item = require(path);

  return item.default
    ? item.default
    : Object.keys(item).length === 1
    ? Object.values(item)[0]
    : item;
};
