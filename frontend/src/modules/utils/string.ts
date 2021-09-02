export const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';

export const cleanHTMLElementsFromString = (str: string | undefined = ''): string => {
  const div = document.createElement('div');
  div.innerHTML = str;
  const content = div.textContent as string;
  return content.trim();
};
