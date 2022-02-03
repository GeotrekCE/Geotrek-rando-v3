import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTags } from './interface';

export const fetchTags = (query: APIQuery): Promise<RawTags> =>
  GeotrekAPI.get('/label', { params: { ...query } })
  .then(r => r.data);
