import { mockRoute } from 'services/testing/utils';
import { ServiceType } from '../interface';

interface ServiceTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceType[];
}

export const mockServiceTypeResponse = (): ServiceTypeResponse => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: "Petit cours d'eau",
      pictogram: null,
    },
  ],
});

export const mockServiceTypeRoute = (times: number): void =>
  mockRoute({
    route: '/service_type',
    mockData: mockServiceTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
