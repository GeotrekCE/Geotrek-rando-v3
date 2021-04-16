import { getPoiTypes } from 'modules/poiType/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { adaptPoi } from './adapter';
import { fetchPois } from './api';
import { Poi } from './interface';

export const getPois = async (trekId: number, language: string): Promise<Poi[]> => {
  const pageSize = getGlobalConfig().maxPoiPerPage;
  const [rawPois, poiTypes] = await Promise.all([
    fetchPois({ language, trek: trekId, page_size: pageSize }),
    getPoiTypes(language),
  ]);
  return adaptPoi({ rawPoisResults: rawPois.results, poiTypes });
};
