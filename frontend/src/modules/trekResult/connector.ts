import { adaptTrekPopupResults } from './adapter';
import { fetchTrekPopupResult } from './api';
import { TrekPopupResult } from './interface';

export const getTrekPopupResult = async (id: string): Promise<TrekPopupResult> => {
  const rawTrekPopupResult = await fetchTrekPopupResult({ language: 'fr' }, id);

  return adaptTrekPopupResults(rawTrekPopupResult);
};
