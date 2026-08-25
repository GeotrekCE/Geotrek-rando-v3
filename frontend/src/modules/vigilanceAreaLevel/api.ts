import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawVigilanceAreaLevel } from './interface';

export const fetchVigilanceAreaLevels = (
  query: APIQuery,
): Promise<APIResponseForList<RawVigilanceAreaLevel>> =>
  GeotrekAPI.get('/vigilancearea_vigilancelevel/', {
    params: { ...query },
  }).then(r => r.data);
