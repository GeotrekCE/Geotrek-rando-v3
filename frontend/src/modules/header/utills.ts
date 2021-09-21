import { convertStringForSitemap } from 'components/pages/search/utils';
import { routes } from 'services/routes';
import headerConfig from '../../../config/header.json';
import structureHeaderConfig from '../../../customization/config/header.json';
import { HeaderConfig } from './interface';

export const getHeaderConfig = (): HeaderConfig => ({
  ...headerConfig,
  ...structureHeaderConfig,
});

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
