import { NextRouter } from 'next/router';
import { routes } from './routes';

export const switchToLanguage = async (router: NextRouter, newLanguage: string) => {
  await router.replace(
    {
      pathname: router.pathname,
      query: { ...router.query },
    },
    router.pathname,
    { locale: newLanguage },
  );
};

export const isRessourceMissing = (error: Error | null): boolean =>
  error !== null && error?.message === 'Failed to fetch';

export const isInternalFlatPageUrl = (url: string): boolean => {
  if (url === undefined) return false;
  return url.indexOf(`${routes.FLAT_PAGE}/`) === 0;
};
