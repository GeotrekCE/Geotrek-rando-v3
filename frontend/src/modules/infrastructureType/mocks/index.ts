import { mockRoute } from 'services/testing/utils';
import { InfrastructureType } from '../interface';

interface InfrastructureTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InfrastructureType[];
}

export const mockInfrastructureTypeResponse = (): InfrastructureTypeResponse => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      label: 'Parking du village',
      pictogram: null,
    },
  ],
});

export const mockInfrastructureTypeRoute = (times: number): void =>
  mockRoute({
    route: '/infrastructure_type/',
    mockData: mockInfrastructureTypeResponse(),
    additionalQueries: {
      fields: 'id,label,pictogram',
    },
    times,
  });
