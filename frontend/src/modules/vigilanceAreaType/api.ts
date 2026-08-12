import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawVigilanceAreaType } from './interface';

export const fetchVigilanceAreaTypes = (
  query: APIQuery,
): Promise<APIResponseForList<RawVigilanceAreaType>> => {
  return GeotrekAPI.get('/vigilancearea_type/', { params: query })
    .then(r => r.data)
    .catch(error => {
      console.warn('Failed to fetch vigilancearea_type:', error);
      return { count: 0, next: null, previous: null, results: [] };
    });
};
