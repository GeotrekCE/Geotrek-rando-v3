import { routes } from 'services/routes';
import headerConfig from '../../../config/header.json';
import structureHeaderConfig from '../../../customization/config/header.json';
import { HeaderConfig } from './interface';

export const getHeaderConfig = (): HeaderConfig => ({
  ...headerConfig,
  ...structureHeaderConfig,
});

export const generateFlatPageUrl = (id: number, title: string): string => {
  const titleWithNoSpace = title.replace(/ /g, '-');
  return `${routes.FLAT_PAGE}/${id}-${encodeURI(titleWithNoSpace)}`;
};
