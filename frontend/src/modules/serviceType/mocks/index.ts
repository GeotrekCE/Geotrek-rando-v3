import { mockRoute } from 'services/testing/utils';

export const mockServiceTypeResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      type: {
        id: 1,
        name: "Petit cours d'eau",
        pictogram: null,
      },
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
