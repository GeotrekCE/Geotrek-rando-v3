import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { SignageType } from '../interface';

export const mockSignageTypeResponse = (): APIResponseForList<SignageType> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      label: 'Entrée du parc',
      pictogram: null,
    },
  ],
});

export const mockSignageTypeRoute = (times: number): void =>
  mockRoute({
    route: '/signage_type/',
    mockData: mockSignageTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
