import { mockRoute } from 'services/testing/utils';

export const mockSignageResponse = () => ({
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
      geometry: { type: 'Point', coordinates: [1, 2] },
      type: 1,
    },
  ],
});

export const mockSignageRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/signage',
    mockData: mockSignageResponse(),
    additionalQueries: {
      fields: 'attachments,description,id,geometry,name,type',
      near_trek: nearTrek,
    },
    times,
  });
