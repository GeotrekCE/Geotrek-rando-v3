import { getPoiTypes } from 'modules/poiType/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { adaptPoi } from './adapter';
import { fetchPois } from './api';
import { Poi } from './interface';

export const getPois = async (id: number, language: string, key = 'near_trek'): Promise<Poi[]> => {
  const pageSize = getGlobalConfig().maxPoiPerPage;
  const [rawPois, poiTypes] = await Promise.all([
    fetchPois({ language, [key]: id, page_size: pageSize }),
    getPoiTypes(language),
  ]);
  return adaptPoi({ language, rawPoisResults: rawPois.results, poiTypes });
};
