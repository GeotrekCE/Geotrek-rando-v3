import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawVigilanceArea, RawVigilancePeriod } from './interface';

export interface RawVigilanceAreaPeriodResponse {
  id: number;
  impracticable: boolean;
  periods: RawVigilancePeriod[];
}

export const fetchVigilanceArea = (id: number, query: APIQuery): Promise<RawVigilanceArea | null> => {
  return GeotrekAPI.get(`/vigilancearea/${id}/`, { params: query })
    .then(response => response.data)
    .catch(error => {
      if (error?.status !== 404 && error?.response?.status !== 404) {
        console.warn(`Failed to fetch vigilancearea ${id}:`, error);
      }
      return null;
    });
};

export const fetchVigilanceAreasPeriods = (
  query: APIQuery,
): Promise<APIResponseForList<RawVigilanceAreaPeriodResponse>> => {
  return GeotrekAPI.get('/vigilancearea/', {
    params: { ...query, fields: 'id,impracticable,periods' },
  })
    .then(response => response.data)
    .catch(error => {
      console.warn('Failed to fetch vigilance areas periods:', error);
      return { count: 0, next: null, previous: null, results: [] };
    });
};
