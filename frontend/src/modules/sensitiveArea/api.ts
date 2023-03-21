import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSensitiveArea } from './interface';

export const fetchSensitiveAreas = (
  type: 'trek' | 'outdoorSite' | 'outdoorCourse',
  id: number,
  query: APIQuery,
): Promise<APIResponseForList<RawSensitiveArea>> => {
  const typeKey = `near_${type.toLowerCase()}`;
  const params = { ...query, period: 'ignore', [typeKey]: id };
  return GeotrekAPI.get('/sensitivearea/', { params }).then(r => r.data);
};
