import wretch from 'wretch';
import { Report } from 'modules/report/interface';
import { getGlobalConfig } from '../utils/api.config';

export const postReport = async (lang: string, query: Report): Promise<any> =>
  wretch(`${getGlobalConfig().apiUrl.replace('/v2', `/${lang}`)}/reports/report`).post({
    ...query,
  });
