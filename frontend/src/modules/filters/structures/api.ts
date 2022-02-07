import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawStructure } from './interface';

export const fetchStructures = (query: APIQuery): Promise<APIResponseForList<RawStructure>> =>
  GeotrekAPI.get('/structure', { params: query }).then(r => r.data);
