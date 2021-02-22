import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawListActivity } from './interface';

export const fetchActivity = (query: APIQuery, id: number): Promise<RawListActivity> => {
  return GeotrekAPI.url(`/trek_practice/${id}/`).query(query).get().json();
};

export const fetchActivities = (
  query: APIQuery,
): Promise<APIResponseForList<Partial<RawListActivity>>> => {
  return GeotrekAPI.url('/trek_practice').query(query).get().json();
};
