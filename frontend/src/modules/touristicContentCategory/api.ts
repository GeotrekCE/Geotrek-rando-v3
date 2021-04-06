import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTouristicContentCategory } from './interface';

export const fetchTouristicContentCategories = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContentCategory>> =>
  GeotrekAPI.url(`/touristiccontent_category`)
    .query({ ...query, ...portalsFilter })
    .get()
    .json();

export const fetchTouristicContentCategory = (
  query: APIQuery,
  id: number,
): Promise<RawTouristicContentCategory> =>
  GeotrekAPI.url(`/touristiccontent_category/${id}/`).query(query).get().json();
