import { mockRoute } from 'services/testing/utils';

export const mockSignageTypeResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      type: {
        id: 1,
        label: 'Entrée du parc',
        pictogram: null,
      },
    },
  ],
});

export const mockSignageTypeRoute = (times: number): void =>
  mockRoute({
    route: '/signage_type',
    mockData: mockSignageTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
