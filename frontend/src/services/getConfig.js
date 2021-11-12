const fs = require('fs');

const getConfig = (file, parse = true) => {
  // Default configuration
  const defaultPath = `./config/${file}`;
  let defaultConfig = parse ? {} : '';
  if (fs.existsSync(defaultPath)) {
    const content = fs.readFileSync(defaultPath).toString();
    defaultConfig = parse ? JSON.parse(content) : content;
  }

  // Override configuration
  const path = `./customization/config/${file}`;
  let overrideConfig = parse ? {} : '';
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path).toString();
    overrideConfig = parse ? JSON.parse(content) : content;
  }

  const merge = (elem1, elem2) => {
    if (Array.isArray(elem1)) return [...elem1, ...elem2];
    else return { ...elem1, ...elem2 };
  };

  return parse ? merge(defaultConfig, overrideConfig) : overrideConfig || defaultConfig;
};

module.exports = getConfig;
