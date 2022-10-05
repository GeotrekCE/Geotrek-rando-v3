type Message = string | NestedDictionary;
interface NestedDictionary {
  [x: string]: Message;
}
interface FlattenedDictionary {
  [x: string]: string;
}

export const flattenMessages = (
  nestedMessages: NestedDictionary,
  prefix = '',
): FlattenedDictionary =>
  Object.keys(nestedMessages).reduce((messages: FlattenedDictionary, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix !== '' ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

export const getCountryCodeFromLanguage = (language: string) => {
  const [lng, region] = language.toUpperCase().split('-');
  if (lng === 'EN') {
    // Canada / USA / etc
    if (region) {
      return region;
    }
    return 'GB';
  }
  // Catalan does not have an official country code
  if (lng === 'CA') {
    return 'ES-CT';
  }
  return lng;
};

export default flattenMessages;
