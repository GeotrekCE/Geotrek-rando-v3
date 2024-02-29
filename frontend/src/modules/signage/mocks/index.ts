import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawSignage } from '../interface';

export const mockSignageResponse = (): APIResponseForList<RawSignage> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      attachments: [
        {
          type: 'image',
          thumbnail: 'url/to/image.jpg',
        },
      ],
      id: 1,
      description: 'Signage description',
      name: 'Signage name',
      geometry: { type: 'Point', coordinates: [1, 2, 3] },
      type: 1,
      code: '21548',
      condition: 1,
      implantation_year: 2018,
      printed_elevation: 2854,
      sealing: 2,
      structure: 'foo',
    },
  ],
});

export const mockSignageRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/signage/',
    mockData: mockSignageResponse(),
    additionalQueries: {
      fields: 'attachments,description,id,geometry,name,type',
      near_trek: nearTrek,
    },
    times,
  });
