import { getGlobalConfig } from 'modules/utils/api.config';
import { postReport } from './api';

export const createReport = async (lang: string, params: FormData) => {
  const { hCaptchaKey } = getGlobalConfig();

  if (params.get('email') === '') throw new Error('error.missing.email');
  if (params.get('problem_magnitude') === '') throw new Error('error.missing.magnitude');
  if (params.get('activity') === '') throw new Error('error.missing.activity');
  if (params.get('category') === '') throw new Error('error.missing.category');
  if (hCaptchaKey !== null && params.get('g-recaptcha-response') === '')
    throw new Error('error.missing.captcha');

  return postReport(lang, params);
};
