import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSensitiveArea } from './interface';

export const fetchSensitiveAreas = (
  type: 'trek' | 'outdoorSite' | 'outdoorCourse',
  id: number,
  query: APIQuery,
): Promise<APIResponseForList<RawSensitiveArea>> => {
  const params =
    type === 'trek'
      ? { ...query, period: 'ignore', trek: id }
      : type === 'outdoorSite'
      ? { ...query, period: 'ignore', near_outdoorsite: id }
      : type === 'outdoorCourse'
      ? { ...query, period: 'ignore', near_outdoorcourse: id }
      : { ...query, period: 'ignore', trek: id };
  return GeotrekAPI.get(`/sensitivearea`, { params }).then(r => r.data);
};
