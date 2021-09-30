import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getHeaderConfig } from '../header/utills';
import { getGlobalConfig } from './api.config';

export const redirectIfWrongUrl = (
  id: string,
  title: string,
  context: { locale: string; req: NextApiRequest; res: NextApiResponse },
  route: string,
  parentId?: number,
): void => {
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

  if (context.req.url !== pathname && process.env.NODE_ENV === 'production') {
    // We do a permanent redirect to help search engine to find new version
    context.res.writeHead(301, { location: url });
    context.res.end();
  }
};
