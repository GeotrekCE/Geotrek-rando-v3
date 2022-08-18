import { mockRoute } from 'services/testing/utils';
import { RawLabel } from '../interface';

interface LabelResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawLabel[];
}

export const mockLabelRoute = (times: number): void =>
  mockRoute({
    route: '/label',
    mockData: mockLabelResponse(),
    additionalQueries: {},
    times,
  });

export const mockLabelResponse = (): LabelResponse => ({
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
