const path = require("path");
const fs = require("fs");

const headerConfig = require('../config/header.json');
const customHeaderConfig = require('../customization/config/header.json');

const { menu:  { supportedLanguages } } = {
  ...headerConfig,
  ...customHeaderConfig,
};

const flattenMessages = (
  nestedMessages,
  prefix = '',
) =>
  Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix !== '' ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

const getMessagesFromLanguage = (language) => {
  const translationsFile = path.join(__dirname, `../src/translations/${String(language)}.json`);
  const messages = JSON.parse(
    fs.readFileSync(translationsFile).toString(),
  );
  const customTranslationsFile = path.join(__dirname, `../customization/translations/${String(language)}.json`);
  let customMessages = {};
  if (fs.existsSync(customTranslationsFile)) {
    customMessages = JSON.parse(fs.readFileSync(customTranslationsFile).toString());
  }
  
  return {
    ...flattenMessages(messages),
    ...flattenMessages(customMessages),
  };
}

const data = supportedLanguages.reduce((list, language) => {
  return {...list, [language]: getMessagesFromLanguage(language) };
}, {}) 

const localesPath = path.join(__dirname, "../src/public/locales.json");

fs.writeFile(localesPath, JSON.stringify(data, null, 2), function(err) {
  if (err) throw err;
  console.log("Locales file generated.")
});
