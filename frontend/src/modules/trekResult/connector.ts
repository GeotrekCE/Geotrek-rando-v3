import { adaptTrekGeometryResults, adaptTrekPopupResults } from './adapter';
import { fetchTrekGeometryResult, fetchTrekPopupResult } from './api';
import { PopupResult, TrekGeometryResult } from './interface';

export const getTrekPopupResult = async (id: string, language: string): Promise<PopupResult> => {
  const rawTrekPopupResult = await fetchTrekPopupResult({ language }, id);

  return adaptTrekPopupResults(rawTrekPopupResult);
};

export const getTrekGeometryResult = async (
  id: string,
  language: string,
): Promise<TrekGeometryResult> => {
  const rawTrekGeometryResult = await fetchTrekGeometryResult({ language }, id);

  return adaptTrekGeometryResults(rawTrekGeometryResult);
};
