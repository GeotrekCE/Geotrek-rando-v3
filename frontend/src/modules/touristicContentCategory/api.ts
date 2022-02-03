import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { theme } from '../../../tailwind.config';
import { RawTouristicContentCategory } from './interface';

export const fetchTouristicContentCategories = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContentCategory>> =>
  GeotrekAPI.get(`/touristiccontent_category`, { params: { ...query, ...portalsFilter } }).then(
    r => r.data,
  );

export const fetchTouristicContentCategory = (
  query: APIQuery,
  id: number,
): Promise<RawTouristicContentCategory> =>
  GeotrekAPI.get(`/touristiccontent_category/${id}/`, { params: query }).then(r => r.data);
