import { postReport } from './api';

export const createReport = async (lang: string, params: FormData) => {
  if (params.get('email') === '') throw new Error('error.missing.email');
  if (params.get('problem_magnitude') === '') throw new Error('error.missing.magnitude');
  if (params.get('activity') === '') throw new Error('error.missing.activity');
  if (params.get('category') === '') throw new Error('error.missing.category');

  return postReport(lang, params);
};
