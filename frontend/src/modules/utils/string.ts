import striptags from 'striptags';

export const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';

export const cleanHTMLElementsFromString = (str: string | undefined = ''): string =>
  striptags(str).trim();
