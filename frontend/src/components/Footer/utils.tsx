export const isLinkInternal = (urlString: string): boolean => {
  const { hostname } = new URL(urlString, document.baseURI);
  return hostname === global.location.hostname;
};

export const linkWithoutHost = (urlString: string): string => {
  const { pathname } = new URL(urlString, document.baseURI);
  return pathname;
};
