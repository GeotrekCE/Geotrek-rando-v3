import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTouristicContentCategory } from './interface';

export const fetchTouristicContentCategories = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContentCategory>> =>
  GeotrekAPI.url(`/touristiccontentcategory`).query(query).get().json();

export const fetchTouristicContentCategory = (
  query: APIQuery,
  id: number,
): Promise<RawTouristicContentCategory> =>
  GeotrekAPI.url(`/touristiccontentcategory/${id}/`).query(query).get().json();
