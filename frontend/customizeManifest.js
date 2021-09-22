const manifest = require('./src/public/manifest.json');
const fs = require('fs');
const getNextConfig = require('next/config');

const {
  publicRuntimeConfig: { global },
} = getNextConfig();

manifest.name = global.applicationName;

console.log(
  'The manifest.json file is about to be customized with content from customization/config/global.json',
);

fs.writeFileSync('./src/public/manifest.json', JSON.stringify(manifest));
