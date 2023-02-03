const fs = require('fs');

const headerConfig = require('../../config/header.json');
const customHeaderConfig = require('../../customization/config/header.json');
const { getLocales } = require('./getLocales');

const mergedHeaderConfig = {
  ...headerConfig,
  ...customHeaderConfig,
};

const getContent = (path, parse) => {
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path).toString();
    return parse ? JSON.parse(content) : content;
  }
  parse ? {} : '';
};

const getConfig = (file, parse = true) => {
  // Default configuration
  const defaultConfig = getContent(`./config/${file}`, parse);

  // Override configuration
  const overrideConfig = getContent(`./customization/config/${file}`, parse);

  const merge = (elem1, elem2) => {
    if (Array.isArray(elem1)) return [...elem2, ...elem1];
    else return { ...elem1, ...elem2 };
  };

  return parse
    ? merge(defaultConfig, overrideConfig)
    : overrideConfig || defaultConfig;
};

const getTemplates = (file, languages) => {
  const [path] = file.split('.html');
  return languages.reduce(
    (list, language) => {
      list[language] = getContent(
        `./customization/config/${path}-${language}.html`,
        false,
      );
      return list;
    },
    { default: getContent(`./customization/config/${file}`, false) },
  );
};

const getAllConfigs = {
  homeBottomHtml: getTemplates(
    '../html/homeBottom.html',
    mergedHeaderConfig.menu.supportedLanguages,
  ),
  homeTopHtml: getTemplates(
    '../html/homeTop.html',
    mergedHeaderConfig.menu.supportedLanguages,
  ),
  headerTopHtml: getTemplates(
    '../html/headerTop.html',
    mergedHeaderConfig.menu.supportedLanguages,
  ),
  headerBottomHtml: getTemplates(
    '../html/headerBottom.html',
    mergedHeaderConfig.menu.supportedLanguages,
  ),
  footerTopHtml: getTemplates(
    '../html/footerTop.html',
    mergedHeaderConfig.menu.supportedLanguages,
  ),
  footerBottomHtml: getTemplates(
    '../html/footerBottom.html',
    mergedHeaderConfig.menu.supportedLanguages,
  ),
  scriptsHeaderHtml: getConfig('../html/scriptsHeader.html', false),
  scriptsFooterHtml: getConfig('../html/scriptsFooter.html', false),
  style: getConfig('../theme/style.css', false),
  colors: getConfig('../theme/colors.json', true),
  header: getConfig('header.json', true),
  global: getConfig('global.json', true),
  home: getConfig('home.json', true),
  map: getConfig('map.json', true),
  filter: getConfig('filter.json', true),
  footer: getConfig('footer.json', true),
  manifest: getConfig('manifest.json', true),
  locales: getLocales(mergedHeaderConfig.menu.supportedLanguages),
};

module.exports = {
  getConfig,
  getAllConfigs,
  getTemplates,
};
