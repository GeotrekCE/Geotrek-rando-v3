import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { NextApiRequest, NextApiResponse, Redirect } from 'next';
import { getHeaderConfig } from '../header/utills';
import { getGlobalConfig } from './api.config';

export const redirectIfWrongUrl = (
  id: string,
  title: string,
  context: { locale: string; req: NextApiRequest; res: NextApiResponse; resolvedUrl: string },
  route: string,
  parentId?: number,
) => {
  const baseUrl = getGlobalConfig().baseUrl;
  const baseUrlLocalised =
    getHeaderConfig().menu.defaultLanguage === context.locale
      ? baseUrl
      : `${baseUrl}/${context.locale}`;
  const baseUrlTrimmed = baseUrlLocalised.endsWith('/')
    ? baseUrlLocalised.slice(0, -1)
    : baseUrlLocalised;
  const pathname = generateResultDetailsUrl(id, title, route, parentId);

  const url = `${baseUrlTrimmed}${pathname}`;

  if (context.resolvedUrl.split('?')[0] !== pathname && process.env.NODE_ENV === 'production') {
    return {
      destination: url,
      permanent: true,
    } as Redirect;
  }
};
