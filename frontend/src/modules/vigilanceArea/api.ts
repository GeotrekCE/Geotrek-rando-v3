import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawVigilanceArea } from './interface';

export const fetchVigilanceArea = (id: number, query: APIQuery): Promise<RawVigilanceArea | null> => {
  return GeotrekAPI.get(`/vigilancearea/${id}/`, { params: query })
    .then(r => r.data)
    .catch(error => {
      if (error?.status !== 404 && error?.response?.status !== 404) {
        console.warn(`Failed to fetch vigilancearea ${id}:`, error);
      }
      return null;
    });
};
