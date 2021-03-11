const manifest = require('./src/public/manifest.json');
const globalCustomization = require('./customization/config/global.json');
const globalConfiguration = require('./config/global.json');
const fs = require('fs');

manifest.name = globalCustomization.applicationName
  ? globalCustomization.applicationName
  : globalConfiguration.applicationName;

console.log(
  'The manifest.json file is about to be customized with content from customization/config/global.json',
);

fs.writeFileSync('./src/public/manifest.json', JSON.stringify(manifest));
