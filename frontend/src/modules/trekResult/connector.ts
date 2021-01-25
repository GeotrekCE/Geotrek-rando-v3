import { adaptTrekGeometryResults, adaptTrekPopupResults } from './adapter';
import { fetchTrekGeometryResult, fetchTrekPopupResult } from './api';
import { TrekGeometryResult, TrekPopupResult } from './interface';

export const getTrekPopupResult = async (id: string): Promise<TrekPopupResult> => {
  const rawTrekPopupResult = await fetchTrekPopupResult({ language: 'fr' }, id);

  return adaptTrekPopupResults(rawTrekPopupResult);
};

export const getTrekGeometryResult = async (id: string): Promise<TrekGeometryResult> => {
  const rawTrekGeometryResult = await fetchTrekGeometryResult({ language: 'fr' }, id);

  return adaptTrekGeometryResults(rawTrekGeometryResult);
};
