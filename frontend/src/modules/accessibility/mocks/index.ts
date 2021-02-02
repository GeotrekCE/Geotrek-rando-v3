import { mockRoute } from 'services/testing/utils';

export const mockAccessibilitiesResponse = () => ({
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: 'Fauteuil roulant',
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/accessibility-wheelchair.png',
    },
    {
      id: 3,
      name: 'Joelette',
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/accessibility-joelette.png',
    },
    {
      id: 2,
      name: 'Poussette',
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/accessibility-troller.png',
    },
  ],
});

export const mockAccessibilitiesRoute = (times: number): void =>
  mockRoute({
    route: '/accessibility',
    mockData: mockAccessibilitiesResponse(),
    additionalQueries: {},
    times,
  });
