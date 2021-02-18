import { adaptPoiTypes } from './adapter';
import { fetchPoiTypes } from './api';
import { PoiTypeDictionnary } from './interface';

export const getPoiTypes = async (language: string): Promise<PoiTypeDictionnary> => {
  const rawPoiTypes = await fetchPoiTypes({ language });
  return adaptPoiTypes(rawPoiTypes.results);
};
