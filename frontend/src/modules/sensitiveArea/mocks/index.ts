import { mockRoute } from 'services/testing/utils';

export const mockSensitiveAreasResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 111,
      name: 'Mock zone sensible',
    },
  ],
});

export const mockSensitiveAreaRoute = (times: number): void =>
  mockRoute({
    route: '/sensitivearea',
    mockData: mockSensitiveAreasResponse(),
    additionalQueries: {
      period: 'ignore',
      trek: 2,
    },
    times,
  });
