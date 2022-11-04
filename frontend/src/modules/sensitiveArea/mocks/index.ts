import { mockRoute } from 'services/testing/utils';
import { RawSensitiveArea } from '../interface';

interface SensitiveAreasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawSensitiveArea[];
}

export const mockSensitiveAreasResponse = (): SensitiveAreasResponse => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 111,
      name: 'Mock zone sensible',
      geometry: {
        type: 'Polygon',
        coordinates: [],
      },
      contact: 'foo',
      description: 'Description',
      elevation: '400',
      info_url: '',
      kml_url: '',
      period: [true, false, false, false, false, false, false, false, false, true, false, false],
      practices: [1],
      species_id: 1,
      structure: 'foo',
      url: '',
    },
  ],
});

export const mockSensitiveAreaRoute = (times: number): void =>
  mockRoute({
    route: '/sensitivearea/',
    mockData: mockSensitiveAreasResponse(),
    additionalQueries: {
      period: 'ignore',
      trek: 2,
    },
    times,
  });
