import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawListActivity } from './interface';

export const fetchActivity = (query: APIQuery, id: number): Promise<RawListActivity> => {
  return GeotrekAPI.get(`/trek_practice/${id}/`, { params: query }).then(r => r.data);
};

export const fetchActivities = (
  query: APIQuery,
): Promise<APIResponseForList<Partial<RawListActivity>>> => {
  return GeotrekAPI.get('/trek_practice/', { params: { ...query, ...portalsFilter } }).then(
    r => r.data,
  );
};
