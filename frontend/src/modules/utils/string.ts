export const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';
