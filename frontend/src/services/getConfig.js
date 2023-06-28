const fs = require('fs');
const deepmerge = require('deepmerge');
const { getLocales } = require('./getLocales');

const getContent = (path, parse) => {
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path).toString();
    return parse ? JSON.parse(content) : content;
  }
  parse ? {} : '';
};

const getConfig = (file, parse = true, deepMerge = false) => {
  // Default configuration
  const defaultConfig = getContent(`./config/${file}`, parse);

  // Override configuration
  const overrideConfig = getContent(`./customization/config/${file}`, parse);

  const merge = (elem1, elem2) => {
    if (Array.isArray(elem1)) {
      return [...elem2, ...elem1];
    } 
    if (deepMerge) {
      return deepmerge.all([elem2 ?? {}, elem1 ?? {}])
    }
    else {
      return { ...elem1, ...elem2 }
    };
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

const headers = getConfig('header.json', true);

const configDetails = getConfig('details.json', true, true);

const filterAndOrderSectionsDetails = sections =>
  sections
    .filter(({ name }, index, array) => array.findIndex(item => item.name === name) === index)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))

const details = {
  ...configDetails,
  sections: {
    ...configDetails.sections,
    trek: filterAndOrderSectionsDetails(configDetails.sections.trek),
    touristicContent: filterAndOrderSectionsDetails(configDetails.sections.touristicContent),
    touristicEvent: filterAndOrderSectionsDetails(configDetails.sections.touristicEvent),
    outdoorSite: filterAndOrderSectionsDetails(configDetails.sections.outdoorSite),
    outdoorCourse: filterAndOrderSectionsDetails(configDetails.sections.outdoorCourse)
  }
}

const getAllConfigs = {
  homeBottomHtml: getTemplates(
    '../html/homeBottom.html',
    headers.menu.supportedLanguages,
  ),
  homeTopHtml: getTemplates(
    '../html/homeTop.html',
    headers.menu.supportedLanguages,
  ),
  headerTopHtml: getTemplates(
    '../html/headerTop.html',
    headers.menu.supportedLanguages,
  ),
  headerBottomHtml: getTemplates(
    '../html/headerBottom.html',
    headers.menu.supportedLanguages,
  ),
  footerTopHtml: getTemplates(
    '../html/footerTop.html',
    headers.menu.supportedLanguages,
  ),
  footerBottomHtml: getTemplates(
    '../html/footerBottom.html',
    headers.menu.supportedLanguages,
  ),
  scriptsHeaderHtml: getConfig('../html/scriptsHeader.html', false),
  scriptsFooterHtml: getConfig('../html/scriptsFooter.html', false),
  style: getConfig('../theme/style.css', false),
  colors: getConfig('../theme/colors.json', true),
  details,
  header: getConfig('header.json', true),
  global: getConfig('global.json', true),
  home: getConfig('home.json', true),
  map: getConfig('map.json', true),
  filter: getConfig('filter.json', true),
  footer: getConfig('footer.json', true),
  manifest: getConfig('manifest.json', true),
  locales: getLocales(headers.menu.supportedLanguages),
};

module.exports = {
  getConfig,
  getAllConfigs,
  getTemplates,
};
