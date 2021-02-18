import { getPoiTypes } from 'modules/poiType/connector';
import { adaptPoi } from './adapter';
import { fetchPois } from './api';
import { Poi } from './interface';

export const getPois = async (trekId: number, language: string): Promise<Poi[]> => {
  const [rawPois, poiTypes] = await Promise.all([
    fetchPois({ language, trek: trekId }),
    getPoiTypes(language),
  ]);
  return adaptPoi({ rawPoisResults: rawPois.results, poiTypes });
};
