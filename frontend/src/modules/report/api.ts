import { Report } from 'modules/report/interface';
import { getGlobalConfig } from '../utils/api.config';

export const postReport = async (lang: string, query: Report): Promise<any> => {
  // We must use fetch instead of wretch because we need the control on headers.
  // There is a limitation in the API which need to build a specific post request

  const data = new FormData();
  Object.keys(query).forEach(key => {
    // @ts-ignore
    const value = String(query[key]);
    data.append(key, value);
  });

  return fetch(`${getGlobalConfig().apiUrl.replace('/v2', `/${lang}`)}/reports/report`, {
    method: 'POST',
    body: data,
  });
};
