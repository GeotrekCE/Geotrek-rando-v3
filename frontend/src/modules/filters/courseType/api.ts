import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawCourseType } from './interface';

export const fetchCourseTypes = (query: APIQuery): Promise<APIResponseForList<RawCourseType>> =>
  GeotrekAPI.get('/trek_route/', { params: { ...query, ...portalsFilter } }).then(r => r.data);

export const fetchCourseType = (query: APIQuery, id: number): Promise<RawCourseType> =>
  GeotrekAPI.get(`/trek_route/${id}/`, { params: query }).then(r => r.data);
