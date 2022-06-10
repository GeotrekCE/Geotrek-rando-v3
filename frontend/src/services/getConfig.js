const fs = require('fs');

const getContent = (path, parse) => {
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path).toString();
    return parse ? JSON.parse(content) : content;
  }
  parse ? {} : '';
}

const getConfig = (file, parse = true) => {
  // Default configuration
  const defaultConfig = getContent(`./config/${file}`, parse);

  // Override configuration
  const overrideConfig = getContent(`./customization/config/${file}`, parse);

  const merge = (elem1, elem2) => {
    if (Array.isArray(elem1)) return [...elem2, ...elem1];
    else return { ...elem1, ...elem2 };
  };

  return parse ? merge(defaultConfig, overrideConfig) : overrideConfig || defaultConfig;
};

const getTemplates = (file, languages) => {
  const [path] = file.split('.html');
  return languages.reduce((list, language) => {
    list[language] = getContent(`./customization/config/${path}-${language}.html`, false);
    return list;
  }, { default : getContent(`./customization/config/${file}`, false) })
};

module.exports = {
  getConfig,
  getTemplates
};
