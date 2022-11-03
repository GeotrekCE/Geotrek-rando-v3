//  The built files are updated with the customization just before starting the application.

import fs from 'fs';
import { getAllConfigs } from './getConfig.js';

import headerConfig from '../../config/header.json' assert { type: 'json' };
import customHeaderConfig from '../../customization/config/header.json' assert { type: 'json' };

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

  mergedHeaderConfig.menu.supportedLanguages.forEach(lang => {
    pages.forEach(page => {
      let file = fs.readFileSync(`./src/.next/server/pages/${lang}/${page}.html`);

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
        `"runtimeConfig":${JSON.stringify(getAllConfigs)}`
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
