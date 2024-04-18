import { APIResponseForList } from 'services/api/interface';
import { mockRoute } from 'services/testing/utils';
import { RawTrekResult } from '../interface';

export const mockResultsResponse = (): APIResponseForList<RawTrekResult> => ({
  count: 4,
  next: 'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=departure%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cthumbnail%2Cpractice&language=fr&page=2&page_size=1',
  previous: null,
  results: [
    {
      id: 1,
      ascent: 1457,
      departure: 'Molines-en-Champsaur',
      difficulty: 4,
      duration: 7,
      length_2d: 15205.4,
      name: 'Col de Font Froide',
      departure_city: '05045',
      practice: 4,
      reservation_system: null,
      themes: [1, 7, 11],
      networks: [1, 2],
      route: 2,
      descent: 1600,
      attachments: [
        {
          author: 'Parc national des Ecrins',
          backend: 'Attachment',
          thumbnail: '',
          legend: 'Présentation Rando Ecrins',
          title: '',
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/le-depart-du-hameau-de-molines.JPG',
          type: 'image',
          filetype: {
            id: 1,
            type: 'Topoguide',
          },
        },
      ],
    },
  ],
});

export const mockResultsRoute = (times: number): void =>
  mockRoute({
    route: '/trek/',
    mockData: mockResultsResponse(),
    additionalQueries: {
      fields:
        'id,departure,name,themes,duration,length_2d,ascent,difficulty,reservation_system,attachments,practice,departure_city',
      page_size: 5,
      page: 1,
    },
    times,
  });

export const mockTouristicContentResultsResponse = (): APIResponseForList<RawTrekResult> => ({
  count: 4,
  next: 'https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?fields=departure%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cthumbnail%2Cpractice&language=fr&page=2&page_size=1',
  previous: null,
  results: [],
});

export const mockTouristicContentResultsRoute = (times: number): void =>
  mockRoute({
    route: '/touristiccontent/',
    mockData: mockTouristicContentResultsResponse(),
    additionalQueries: {
      fields: 'id,attachments,name,category,description_teaser,themes,types,departure_city',
      page_size: 5,
      page: 1,
    },
    times,
  });
