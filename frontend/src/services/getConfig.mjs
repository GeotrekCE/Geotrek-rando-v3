import * as fs from 'fs';
import { merge } from 'ts-deepmerge';
import { getLocales } from './getLocales.mjs';

function isPathExists(pathName) {
  try {
    fs.accessSync(String(pathName), fs.constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function getFiles(dir, files = []) {
  if (!isPathExists(dir)) {
    return files;
  }
  const fileList = fs.readdirSync(String(dir));
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

const getContent = (pathName, parse) => {
  if (isPathExists(pathName)) {
    const content = fs.readFileSync(String(pathName)).toString();
    return parse ? JSON.parse(content) : content;
  }
  parse ? {} : '';
};

export const getConfig = (file, parse = true, deepMerge = false) => {
  // Default configuration
  const defaultConfig = getContent(`./config/${file}`, parse);

  // Override configuration
  const overrideConfig = getContent(`./customization/config/${file}`, parse);

  const mergeHandler = (elem1, elem2) => {
    if (Array.isArray(elem1) && Array.isArray(elem2)) {
      return [...elem2, ...elem1];
    }
    if (deepMerge) {
      return merge(elem2 ?? {}, elem1 ?? {});
    } else {
      return { ...elem1, ...elem2 };
    }
  };

  return parse ? mergeHandler(defaultConfig, overrideConfig) : overrideConfig || defaultConfig;
};

export const getTemplates = (file, languages) => {
  const [pathName] = file.split('.html');
  return languages.reduce(
    (list, language) => {
      list[language] = getContent(`./customization/config/${pathName}-${language}.html`, false);
      return list;
    },
    { default: getContent(`./customization/config/${file}`, false) },
  );
};

const headersConfig = getConfig('header.json', true);

const locales = getLocales(headersConfig.menu.supportedLanguages);

const supportedLanguages = Object.entries(locales)
  .filter(([, value]) => Object.keys(value).length)
  .map(([languageCode]) => languageCode);

const detailsConfig = getConfig('details.json', true, true);

const filterAndOrderSectionsDetails = sections =>
  sections
    .filter(({ name }, index, array) => array.findIndex(item => item.name === name) === index)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

const details = {
  ...detailsConfig,
  sections: {
    ...detailsConfig.sections,
    trek: filterAndOrderSectionsDetails(detailsConfig.sections.trek),
    touristicContent: filterAndOrderSectionsDetails(detailsConfig.sections.touristicContent),
    touristicEvent: filterAndOrderSectionsDetails(detailsConfig.sections.touristicEvent),
    outdoorSite: filterAndOrderSectionsDetails(detailsConfig.sections.outdoorSite),
    outdoorCourse: filterAndOrderSectionsDetails(detailsConfig.sections.outdoorCourse),
  },
};

const detailsFiles = getFiles('./customization/html/details');
const detailsSectionHtml = detailsFiles
  .map(item => item.replace('./customization', '../'))
  .reduce((list, file) => {
    const nameFile = file.split('/').pop()?.split('.')[0] || '';
    return { ...list, [nameFile]: getTemplates(file, supportedLanguages) };
  }, {});

export const runtimeConfig = {
  homeBottomHtml: getTemplates('../html/homeBottom.html', supportedLanguages),
  homeTopHtml: getTemplates('../html/homeTop.html', supportedLanguages),
  headerTopHtml: getTemplates('../html/headerTop.html', supportedLanguages),
  headerBottomHtml: getTemplates('../html/headerBottom.html', supportedLanguages),
  footerTopHtml: getTemplates('../html/footerTop.html', supportedLanguages),
  footerBottomHtml: getTemplates('../html/footerBottom.html', supportedLanguages),
  detailsSectionHtml,
  scriptsHeaderHtml: getConfig('../html/scriptsHeader.html', false),
  scriptsFooterHtml: getConfig('../html/scriptsFooter.html', false),
  style: getConfig('../theme/style.css', false),
  colors: getConfig('../theme/colors.json', true),
  details,
  header: { ...headersConfig, menu: { ...headersConfig.menu, supportedLanguages } },
  global: getConfig('global.json', true),
  home: getConfig('home.json', true),
  map: getConfig('map.json', true),
  filter: getConfig('filter.json', true),
  footer: getConfig('footer.json', true),
  manifest: getConfig('manifest.json', true),
  locales: getLocales(supportedLanguages),
  resultCard: getConfig('resultCard.json', true),
};

const configService = {
  getConfig,
  runtimeConfig,
};

export default configService;
