import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSensitiveArea } from './interface';

export const fetchSensitiveAreas = (
  trekId: number,
  query: APIQuery,
): Promise<APIResponseForList<RawSensitiveArea>> =>
  GeotrekAPI.url(`/sensitivearea`)
    .query({ ...query, period: 'ignore', trek: trekId }) // period = 'ignore' is necessary to retrieve all sensitive areas
    .get()
    .json();
