import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawCourseType } from './interface';

export const fetchCourseTypes = (query: APIQuery): Promise<APIResponseForList<RawCourseType>> =>
  GeotrekAPI.url('/route').query(query).get().json();
