//  The built files are updated with the customization just before starting the application.
import fs from 'fs';
import { getAllConfigs } from './getConfig.mjs';

/** @typedef {import('../modules/interface').ColorsConfig} ColorsConfig */
/** @type {ColorsConfig} */
const colors = getAllConfigs.colors;

const colorsAsString = Object.entries(colors).reduce(
  (list, [key, value]) => {
    if (!value) {
      return list;
    }
    if (typeof value === 'string') {
      list.push(`--color-${key}: ${value}`.toLowerCase());
    } else if(typeof value === 'object' && !Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.entries(value).forEach(item => {
        list.push(`--color-${key}-${item[0]}: ${item[1]}`.toLowerCase());
      });
    }
    return list;
  },
  [],
);

const rewriteBuildedPages = () => {
  const pages = ['404', '_offline', 'offline'];

  const logoUrl = getAllConfigs.header.logo;

  const nextRunTimeConfig = JSON.stringify(getAllConfigs)
    // All HTML configuration will not be displayed. Scripts are removed to avoid breaking the page
    .replace(new RegExp('<script(.*?)</script>', 'g'), '');

  getAllConfigs.header.menu.supportedLanguages.forEach(lang => {
    pages.forEach(page => {
      if (!fs.existsSync(`./src/.next/server/pages/${lang}/${page}.html`)) {
        return;
      }

      let file = fs.readFileSync(`./src/.next/server/pages/${lang}/${page}.html`, 'utf-8');

      // Replace logo
      if (logoUrl) {
        file = `${file}`.replace(
          new RegExp('<img id="header_logoImg"(.*?) src="(.*?)"/>'),
          `<img id="header_logoImg"$1 src="${logoUrl}"/>`,
        );
      }

      // Replace colors
      colorsAsString.forEach(item => {
        const [key, value] = item.split(': ');
        file = `${file}`.replace(new RegExp(`${key}: (.*?);`), `${key}: ${value};`);
      });

      // Replace config
      file = `${file}`.replace(
        new RegExp('"runtimeConfig":(.*?)}}}'),
        `"runtimeConfig":${nextRunTimeConfig}`,
      );

      // Rewrite file
      fs.writeFileSync(`./src/.next/server/pages/${lang}/${page}.html`, file);
    });
  });
};

rewriteBuildedPages();
