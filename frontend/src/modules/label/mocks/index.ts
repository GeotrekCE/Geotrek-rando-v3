import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawLabel } from '../interface';

export const mockLabelRoute = (times: number): void =>
  mockRoute({
    route: '/label/',
    mockData: mockLabelResponse(),
    additionalQueries: {},
    times,
  });

export const mockLabelResponse = (): APIResponseForList<RawLabel> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      advice:
        'Le Parc national est un territoire naturel, ouvert à tous, mais soumis à une réglementation qu’il est utile de connaître pour préparer son séjour',
      name: 'En coeur de parc',
      pictogram: null,
      filter: true,
    },
  ],
});
