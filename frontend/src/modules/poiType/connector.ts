import { adaptPoiTypes } from './adapter';
import { fetchPoiTypes } from './api';
import { PoiTypeDictionnary } from './interface';

export const getPoiTypes = async (): Promise<PoiTypeDictionnary> => {
  const rawPoiTypes = await fetchPoiTypes({ language: 'fr' });
  return adaptPoiTypes(rawPoiTypes.results);
};
