import { mockRoute } from 'services/testing/utils';

export const mockInfrastructureResponse = () => ({
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
      description: 'Infrastructure description',
      name: 'Infrastructure name',
      geometry: { type: 'Point', coordinates: [1, 2] },
      type: 1,
    },
  ],
});

export const mockInfrastructureRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/infrastructure',
    mockData: mockInfrastructureResponse(),
    additionalQueries: {
      fields: 'attachments,description,id,geometry,name,type',
      near_trek: nearTrek,
    },
    times,
  });
