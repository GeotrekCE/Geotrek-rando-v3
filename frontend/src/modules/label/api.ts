import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawLabel } from './interface';

export const fetchLabels = (query: APIQuery): Promise<APIResponseForList<RawLabel>> =>
  GeotrekAPI.get(`/label`, { params: query }).then(r => r.data);
