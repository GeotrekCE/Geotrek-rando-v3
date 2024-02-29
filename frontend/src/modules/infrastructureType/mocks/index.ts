import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { InfrastructureType } from '../interface';

export const mockInfrastructureTypeResponse = (): APIResponseForList<InfrastructureType> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      label: 'Parking du village',
      pictogram: null,
    },
  ],
});

export const mockInfrastructureTypeRoute = (times: number): void =>
  mockRoute({
    route: '/infrastructure_type/',
    mockData: mockInfrastructureTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
