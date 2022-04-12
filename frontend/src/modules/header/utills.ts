import { convertStringForSitemap } from 'components/pages/search/utils';
import getNextConfig from 'next/config';
import { routes } from 'services/routes';
import { HeaderConfig } from './interface';

export const getHeaderConfig = (): HeaderConfig => {
  const {
    publicRuntimeConfig: { header, headerTopHtml, headerBottomHtml },
  } = getNextConfig();

  return { ...header, headerTopHtml, headerBottomHtml };
};

export const getDefaultLanguage = (): string => {
  const languageConfig = getHeaderConfig().menu;
  let defaultLanguage = languageConfig.defaultLanguage;
  if (typeof navigator !== 'undefined') {
    const navigatorLanguage = navigator.language.split('-')[0];
    defaultLanguage = languageConfig.supportedLanguages.includes(navigatorLanguage)
      ? navigatorLanguage
      : defaultLanguage;
  }
  return defaultLanguage;
};

export const generateFlatPageUrl = (id: number, title: string): string => {
  return `${routes.FLAT_PAGE}/${id}-${convertStringForSitemap(title)}`;
};
