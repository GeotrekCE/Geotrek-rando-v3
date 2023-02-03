import { mockRoute } from 'services/testing/utils';
import { RawSensitiveAreaPractice } from '../interface';

interface SensitiveAreaPracticesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawSensitiveAreaPractice[];
}

export const mockSensitiveAreaPracticesResponse = (): SensitiveAreaPracticesResponse => ({
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
    route: '/sensitivearea_practice/',
    mockData: mockSensitiveAreaPracticesResponse(),
    times,
  });
