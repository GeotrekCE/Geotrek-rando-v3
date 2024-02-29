import { getGlobalConfig } from 'modules/utils/api.config';
import { postReport } from './api';

export const getFormErrors = (params: FormData) => {
  const { hCaptchaKey } = getGlobalConfig();
  const fields = ['email', 'problem_magnitude', 'activity', 'category', 'g-recaptcha-response']
    .map(field => {
      if (field === 'g-recaptcha-response' && params.get(field) === '') {
        return hCaptchaKey !== null ? field : null;
      }
      if (params.get(field) === '') {
        return field;
      }
      return null;
    })
    .filter(Boolean) as string[];

  if (fields.length === 0) {
    return null;
  }

  return {
    message: 'search.anErrorOccured',
    fields,
  };
};

export const createReport = (lang: string, params: FormData) => postReport(lang, params);
