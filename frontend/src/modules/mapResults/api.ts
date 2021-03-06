import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTouristicContentMapResults, RawTrekMapResults } from './interface';

const trekFieldsParams = {
  fields: 'id,departure_geom,practice',
};

export const fetchTrekMapResults = (query: APIQuery): Promise<RawTrekMapResults> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...trekFieldsParams, ...portalsFilter })
    .get()
    .json();

const touristicContentFieldsParams = {
  fields: 'id,geometry,category',
};

export const fetchTouristicContentMapResults = (
  query: APIQuery,
): Promise<RawTouristicContentMapResults> =>
  GeotrekAPI.url('/touristiccontent')
    .query({ ...query, ...touristicContentFieldsParams, ...portalsFilter })
    .get()
    .json();
