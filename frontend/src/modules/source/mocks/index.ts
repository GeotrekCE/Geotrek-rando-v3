import { mockRoute } from 'services/testing/utils';

export const mockSourcesResponse = () => ({
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      name: 'Apidae',
      pictogram: null,
      website: null,
    },
    {
      name: 'Maison du tourisme Champsaur Valgaudemar',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/logo_mtcv.jpg',
      website: 'https://www.champsaur-valgaudemar.com',
    },
    {
      name: 'Parc national des Ecrins',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/logo_pne.jpg',
      website: 'http://www.ecrins-parcnational.fr',
    },
  ],
});

export const mockSourceRoute = (times: number): void =>
  mockRoute({
    route: '/source',
    mockData: mockSourcesResponse(),
    additionalQueries: {},
    times,
  });
