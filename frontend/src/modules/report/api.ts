import { getGlobalConfig } from '../utils/api.config';

export const postReport = async (lang: string, query: FormData): Promise<any> => {
  // We must use fetch instead of wretch because we need the control on headers.
  // There is a limitation in the API which need to build a specific post request
  return fetch(`${getGlobalConfig().apiUrl.replace('/v2', `/${lang}`)}/reports/report`, {
    method: 'POST',
    body: query,
  });
};
