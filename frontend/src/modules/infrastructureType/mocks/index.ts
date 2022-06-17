import { mockRoute } from 'services/testing/utils';

export const mockInfrastructureTypeResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      type: {
        id: 1,
        label: 'Parking du village',
        pictogram: null,
      },
    },
  ],
});

export const mockInfrastructureTypeRoute = (times: number): void =>
  mockRoute({
    route: '/infrastructure_type',
    mockData: mockInfrastructureTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
