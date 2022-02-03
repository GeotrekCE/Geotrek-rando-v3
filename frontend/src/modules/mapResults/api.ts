import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTouristicContentMapResults, RawTrekMapResults } from './interface';

const trekFieldsParams = {
  fields: 'id,departure_geom,practice',
};

export const fetchTrekMapResults = (query: APIQuery): Promise<RawTrekMapResults> =>
  GeotrekAPI.get('/trek', { params: { ...query, ...trekFieldsParams, ...portalsFilter } }).then(
    r => r.data,
  );

const touristicContentFieldsParams = {
  fields: 'id,geometry,category',
};

export const fetchTouristicContentMapResults = (
  query: APIQuery,
): Promise<RawTouristicContentMapResults> =>
  GeotrekAPI.get('/touristiccontent', {
    params: { ...query, ...touristicContentFieldsParams, ...portalsFilter },
  }).then(r => r.data);
