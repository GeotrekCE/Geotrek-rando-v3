import { GeometryObject } from 'modules/interface';
import { adaptGeometry } from 'modules/utils/geometry';
import { adaptTrekPopupResults } from './adapter';
import { fetchTrekGeometryResult, fetchTrekPopupResult } from './api';
import { PopupResult } from './interface';

export const getTrekPopupResult = async (id: string, language: string): Promise<PopupResult> => {
  const rawTrekPopupResult = await fetchTrekPopupResult({ language }, id);

  return adaptTrekPopupResults(rawTrekPopupResult);
};

export const getTrekGeometryResult = async (
  id: string,
  language: string,
): Promise<GeometryObject> => {
  const rawTrekGeometryResult = await fetchTrekGeometryResult({ language }, id);
  return adaptGeometry(rawTrekGeometryResult.geometry);
};
