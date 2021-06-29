import { Report } from '../../../../../../../../../home/sylchauf/projects/Geotrek-rando-v3/frontend/src/modules/report/interface';
import { postReport } from './api';

export const createReport = async (lang: string, params: Report) => {
  if (!params.name) throw new Error('error.missing');
  if (!params.email) throw new Error('error.missing');
  if (!params.problem_magnitude) throw new Error('error.missing');
  if (!params.activity) throw new Error('error.missing');
  if (!params.category) throw new Error('error.missing');

  return postReport(lang, params);
};
