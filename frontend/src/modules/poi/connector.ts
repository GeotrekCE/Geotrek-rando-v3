import { fetchPoiTypes } from 'modules/poiType/api';
import { getPoiTypes } from 'modules/poiType/connector';
import { adaptPoi } from './adapter';
import { fetchPois } from './api';
import { Poi } from './interface';

export const getPois = async (trekId: number): Promise<Poi[]> => {
  const [rawPois, poiTypes] = await Promise.all([
    fetchPois({ language: 'fr', trek: trekId }),
    getPoiTypes(),
  ]);
  return adaptPoi({ rawPoisResults: rawPois.results, poiTypes });
};
