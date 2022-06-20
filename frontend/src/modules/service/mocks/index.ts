import { mockRoute } from 'services/testing/utils';

export const mockServiceResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      geometry: { type: 'Point', coordinates: [1, 2] },
      type: 1,
    },
  ],
});

export const mockServiceRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/service',
    mockData: mockServiceResponse(),
    additionalQueries: {
      fields: 'id,geometry,type',
      near_trek: nearTrek,
    },
    times,
  });
