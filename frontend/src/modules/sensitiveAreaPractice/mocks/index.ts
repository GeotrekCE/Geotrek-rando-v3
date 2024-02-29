import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawSensitiveAreaPractice } from '../interface';

export const mockSensitiveAreaPracticesResponse =
  (): APIResponseForList<RawSensitiveAreaPractice> => ({
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
