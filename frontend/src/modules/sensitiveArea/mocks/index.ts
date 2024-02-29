import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawSensitiveArea } from '../interface';

export const mockSensitiveAreasResponse = (): APIResponseForList<RawSensitiveArea> => ({
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
      near_trek: 2,
    },
    times,
  });
