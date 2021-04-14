import { mockRoute } from 'services/testing/utils';

export const mockSensitiveAreaPracticesResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: 'Terrestre',
    },
  ],
});

export const mockSensitiveAreaPracticeRoute = (times: number): void =>
  mockRoute({
    route: '/sensitivearea_practice',
    mockData: mockSensitiveAreaPracticesResponse(),
    times,
  });
