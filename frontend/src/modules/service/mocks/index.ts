import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawService } from '../interface';

export const mockServiceResponse = (): APIResponseForList<RawService> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      geometry: { type: 'Point', coordinates: [1, 2, 3] },
      type: 1,
      structure: 'foo',
    },
  ],
});

export const mockServiceRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/service/',
    mockData: mockServiceResponse(),
    additionalQueries: {
      fields: 'id,geometry,type',
      near_trek: nearTrek,
    },
    times,
  });
