import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSensitiveArea } from './interface';

export const fetchSensitiveAreas = (
  trekId: number,
  query: APIQuery,
): Promise<APIResponseForList<RawSensitiveArea>> =>
  GeotrekAPI.get(`/sensitivearea`, { params: { ...query, period: 'ignore', trek: trekId } }).then(
    r => r.data,
  );
