import { mockRoute } from 'services/testing/utils';
import { RawInfrastructure } from '../interface';

interface InfrastructureResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawInfrastructure[];
}

export const mockInfrastructureResponse = (): InfrastructureResponse => ({
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
      geometry: { type: 'Point', coordinates: [1, 2, 3] },
      type: 1,
      accessibility: '',
      code: '',
      condition: 1,
      implantation_year: 2018,
      printed_elevation: 10,
      sealing: 1,
      structure: '',
    },
  ],
});

export const mockInfrastructureRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/infrastructure/',
    mockData: mockInfrastructureResponse(),
    additionalQueries: {
      fields: 'accessibility,attachments,description,id,geometry,name,type',
      near_trek: nearTrek,
    },
    times,
  });
