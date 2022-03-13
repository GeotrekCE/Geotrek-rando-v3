import { postReport } from './api';

export const createReport = async (lang: string, params: FormData) => {
  if (params.get('email') === '') throw new Error('error.missing');
  if (params.get('problem_magnitude') === '') throw new Error('error.missing');
  if (params.get('activity') === '') throw new Error('error.missing');
  if (params.get('category') === '') throw new Error('error.missing');

  return postReport(lang, params);
};
