import { routes } from './routes';

export const isRessourceMissing = (error: Error | null): boolean =>
  error !== null && error?.message === 'Failed to fetch';

export const isInternalFlatPageUrl = (url: string): boolean => {
  if (url === undefined) return false;
  return url.indexOf(`${routes.FLAT_PAGE}/`) === 0;
};
