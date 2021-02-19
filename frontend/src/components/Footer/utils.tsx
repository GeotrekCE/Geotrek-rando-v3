export const isLinkInternal = (urlString: string): boolean => {
  if (typeof window !== 'undefined') {
    const url = new URL(urlString);
    return url.hostname === window.location.hostname;
  }
  return false;
};

export const linkWithoutHost = (urlString: string): string => {
  const url = new URL(urlString);
  return url.pathname;
};
