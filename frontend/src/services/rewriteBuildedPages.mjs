//  The built files are updated with the customization just before starting the application.

import fs from 'fs';
import { getAllConfigs } from './getConfig.js';

const headerConfig = JSON.parse(fs.readFileSync('./config/header.json' , 'utf8'));
const customHeaderConfig = JSON.parse(fs.readFileSync('./customization/config/header.json' , 'utf8'));

const mergedHeaderConfig = Object.assign(headerConfig, customHeaderConfig);

const getColorsAsString = Object.entries(getAllConfigs.colors ?? []).reduce((list, [key, value]) => {
  if (typeof value === "string") {
    list.push(`--color-${key}: ${value}`.toLowerCase());
  } else {
    Object.entries(value).map(item => {
      list.push(`--color-${key}-${item[0]}: ${item[1]}`.toLowerCase())
    })
  }
  return list;
}, []);

const rewriteBuildedPages = () => {
  const pages = ['404', '_offline', 'offline'];

  const logoUrl = getAllConfigs.header.logo;


  const runTimeConfig = JSON.stringify(getAllConfigs)
    // All HTML configuration will not be displayed. Scripts are removed to avoid breaking the page
    .replace(new RegExp("<script(.*?)</script>"), "");

  mergedHeaderConfig.menu.supportedLanguages.forEach(lang => {
    pages.forEach(page => {
      if (!fs.existsSync(`./src/.next/server/pages/${lang}/${page}.html`)) {
        return;
      }

      let file = fs.readFileSync(`./src/.next/server/pages/${lang}/${page}.html`);

      // Replace logo
      if (logoUrl) {
        file = `${file}`.replace(
        new RegExp('<img id="header_logoImg"(.*?) src="(.*?)"/>'),
        `<img id="header_logoImg"$1 src="${logoUrl}"/>`
        )
      }

      // Replace colors
      getColorsAsString.forEach(item => {
        const [key, value] = item.split(': ')
        file = `${file}`.replace(
          new RegExp(`${key}: (.*?);`),
          `${key}: ${value};`
        )
      })

      // Replace config
      file = `${file}`.replace(
        new RegExp('"runtimeConfig":(.*?)}}}'),
        `"runtimeConfig":${runTimeConfig}`
      )

      // Rewrite file
      fs.writeFileSync(
        `./src/.next/server/pages/${lang}/${page}.html`,
        file
      );
    })
  })
};

rewriteBuildedPages();
