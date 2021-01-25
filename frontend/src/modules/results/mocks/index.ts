import { mockRoute } from 'services/testing/utils';

export const mockResultsResponse = () => ({
  count: 4,
  next:
    'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=departure%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cthumbnail%2Cpractice&language=fr&page=2&page_size=1',
  previous: null,
  results: [
    {
      ascent: 1457,
      departure: 'Molines-en-Champsaur',
      difficulty: 4,
      duration: 7,
      length_2d: 15205.4,
      name: 'Col de Font Froide',
      practice: 4,
      reservation_system: null,
      themes: [1, 7, 11],
      thumbnail: {
        author: 'Dominique Vincent - PNE',
        title: 'le-depart-du-hameau-de-molines',
        legend: 'Le départ du hameau de Molines',
        url:
          'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/le-depart-du-hameau-de-molines.JPG',
      },
    },
  ],
});

export const mockResultsRoute = (times: number): void =>
  mockRoute({
    route: '/trek',
    mockData: mockResultsResponse(),
    additionalQueries: {
      fields:
        'id,departure,name,themes,duration,length_2d,ascent,difficulty,reservation_system,thumbnail,practice',
      page_size: 5,
      page: 1,
    },
    times,
  });
