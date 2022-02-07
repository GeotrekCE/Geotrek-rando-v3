import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSensitiveAreaPractice } from './interface';

export const fetchSensitiveAreaPractices = (
  query: APIQuery,
): Promise<APIResponseForList<RawSensitiveAreaPractice>> =>
  GeotrekAPI.get(`/sensitivearea_practice`, { params: query }).then(r => r.data);
