import { mockRoute } from 'services/testing/utils';
import { RawTrekRating } from '../interface';

interface TrekRatingResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawTrekRating[];
}
export const mockTrekRatingResponse = (): TrekRatingResponse => ({
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: '3',
      name: '3 - Peu difficile',
      description: '',
      scale: 1,
      order: null,
      color: '',
    },
    {
      id: '4',
      name: '4 - Assez difficile',
      description: '',
      scale: 1,
      order: null,
      color: '',
    },
    {
      id: '7',
      name: '2 - Assez facile',
      description: '',
      scale: 2,
      order: null,
      color: '',
    },
    {
      id: '13',
      name: '3 - Peu difficile',
      description: '',
      scale: 3,
      order: null,
      color: '',
    },
    {
      id: '14',
      name: '4 - Assez difficile',
      description: '',
      scale: 3,
      order: null,
      color: '',
    },
  ],
});

export const mockTrekRatingRoute = (): void =>
  mockRoute({
    route: '/trek_rating/',
    mockData: mockTrekRatingResponse(),
    additionalQueries: {
      fields: 'id,name,description,order,color,scale',
    },
  });
