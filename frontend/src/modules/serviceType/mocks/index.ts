import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { ServiceType } from '../interface';

export const mockServiceTypeResponse = (): APIResponseForList<ServiceType> => ({
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
    route: '/service_type/',
    mockData: mockServiceTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
