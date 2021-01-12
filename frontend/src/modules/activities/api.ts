import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawListActivity } from './interface';

export const fetchActivities = (query: APIQuery): Promise<APIResponseForList<RawListActivity>> => {
  return GeotrekAPI.url('/practice').query(query).get().json();
};
