const fs = require('fs');

const getConfig = (file, parse = true) => {
  // Default configuration
  const defaultPath = `./config/${file}`;
  let defaultConfig = {};
  if (fs.existsSync(defaultPath)) {
    const content = fs.readFileSync(defaultPath).toString();
    defaultConfig = parse ? JSON.parse(content) : content;
  }

  // Override configuration
  const path = `./customization/config/${file}`;
  let overrideConfig = {};
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path).toString();
    overrideConfig = parse ? JSON.parse(content) : content;
  }

  return parse ? { ...defaultConfig, ...overrideConfig } : overrideConfig || defaultConfig;
};

module.exports = getConfig;
