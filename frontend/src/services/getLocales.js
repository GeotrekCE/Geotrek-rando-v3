const fs = require('fs');

const getLocales = supportedLanguages => {
  const flattenMessages = (nestedMessages, prefix = '') =>
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

  const getMessagesFromLanguage = language => {
    const translationsFile = `./src/translations/${String(language)}.json`;
    const messages = JSON.parse(fs.readFileSync(translationsFile).toString());
    const customTranslationsFile = `./customization/translations/${String(language)}.json`;
    const customMessages = fs.existsSync(customTranslationsFile)
      ? JSON.parse(fs.readFileSync(customTranslationsFile).toString())
      : {};

    return {
      ...flattenMessages(messages),
      ...flattenMessages(customMessages),
    };
  };

  const data = supportedLanguages.reduce((list, language) => {
    return { ...list, [language]: getMessagesFromLanguage(language) };
  }, {});

  return data;
};

module.exports = {
  getLocales,
};
