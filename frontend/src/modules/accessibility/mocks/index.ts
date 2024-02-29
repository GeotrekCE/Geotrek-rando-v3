import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawAccessibility } from '../interface';

export const mockAccessibilitiesResponse = (): APIResponseForList<RawAccessibility> => ({
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: '1',
      name: 'Fauteuil roulant',
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/accessibility-wheelchair.png',
    },
    {
      id: '3',
      name: 'Joelette',
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/accessibility-joelette.png',
    },
    {
      id: '2',
      name: 'Poussette',
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/accessibility-troller.png',
    },
  ],
});

export const mockAccessibilitiesRoute = (times: number): void =>
  mockRoute({
    route: '/trek_accessibility/',
    mockData: mockAccessibilitiesResponse(),
    additionalQueries: {},
    times,
  });
