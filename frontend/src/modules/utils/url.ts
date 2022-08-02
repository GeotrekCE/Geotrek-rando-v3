import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { Redirect } from 'next';
import { getHeaderConfig } from '../header/utills';
import { getGlobalConfig } from './api.config';

export const redirectIfWrongUrl = (
  id: string,
  title: string,
  context: { locale: string; resolvedUrl: string },
  route: string,
  parentId?: number,
): Redirect | null => {
  const baseUrl = getGlobalConfig().baseUrl;
  const baseUrlLocalized =
    getHeaderConfig().menu.defaultLanguage === context.locale
      ? baseUrl
      : `${baseUrl}/${context.locale}`;
  const baseUrlTrimmed = baseUrlLocalized.endsWith('/')
    ? baseUrlLocalized.slice(0, -1)
    : baseUrlLocalized;
  const pathname = generateResultDetailsUrl(id, title, route, parentId);

  const url = `${baseUrlTrimmed}${pathname}`;

  if (
    context.resolvedUrl.split('?')[0] !== pathname.split('?')[0] &&
    process.env.NODE_ENV === 'production'
  ) {
    return {
      destination: url,
      permanent: true,
    } as Redirect;
  }
  return null;
};
