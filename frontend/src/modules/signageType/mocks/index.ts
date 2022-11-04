import { mockRoute } from 'services/testing/utils';
import { SignageType } from '../interface';

interface SignageTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SignageType[];
}
export const mockSignageTypeResponse = (): SignageTypeResponse => ({
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
