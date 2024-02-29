import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { TrekRatingScale } from '../interface';

export const mockTrekRatingScaleResponse = (): APIResponseForList<TrekRatingScale> => ({
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: 'Effort',
      practice: 4,
    },
    {
      id: 2,
      name: 'Technicité',
      practice: 4,
    },
    {
      id: 3,
      name: 'Risque',
      practice: 4,
    },
    {
      id: 4,
      name: 'Type de voie',
      practice: 1,
    },
    {
      id: 5,
      name: 'Technique',
      practice: 1,
    },
  ],
});

export const mockTrekRatingScaleRoute = (): void =>
  mockRoute({
    route: '/trek_ratingscale/',
    mockData: mockTrekRatingScaleResponse(),
    additionalQueries: {
      fields: 'id,name,practice',
    },
  });
