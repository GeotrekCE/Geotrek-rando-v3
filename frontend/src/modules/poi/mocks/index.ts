import { getGlobalConfig } from 'modules/utils/api.config';
import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawPoi } from '../interface';

export const mockPois = (): APIResponseForList<RawPoi> => ({
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      description:
        "<span>Pour esp&eacute;rer apercevoir cet oiseau, partir la nuit au printemps, parcourir un grand d&eacute;nivel&eacute; afin d'arriver sur son terrain de pr&eacute;dilection &agrave; plus de 2000 m voire 3000 m d'altitude avant le lever du jour et l&agrave;, entendre le chant guttural&nbsp;caract&eacute;ristique qui trahit sa pr&eacute;sence. Mais pour le voir, il faudra bien ouvrir les yeux ou se munir d'une paire de jumelles. Et alors l&agrave;, quel bonheur&nbsp;! Le lagop&egrave;de alpin est l'esp&egrave;ce arctique par excellence, menac&eacute;e entre autre par le r&eacute;chauffement climatique. Il fait partie des esp&egrave;ces &agrave; prot&eacute;ger dans le c&oelig;ur du Parc national des Ecrins.</span>",
      name: 'Lagopède alpin',
      id: 2,
      attachments: [
        {
          author: 'Jean-Philippe Telmon - PNE',
          backend: '',
          thumbnail:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-tenue-dete.jpg.120x120_q85_crop.jpg',
          legend: "Lagopède alpin en tenue d'été",
          title: 'lagopede-alpin-en-tenue-dete',
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-tenue-dete.jpg',
          type: 'image',
        },
        {
          author: 'Damien Combrisson - PNE',
          backend: '',
          thumbnail:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-plumage-dhiver.jpg.120x120_q85_crop.jpg',
          legend: "Lagopède alpin en plumage d'hiver",
          title: 'lagopede-alpin-en-plumage-dhiver',
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-plumage-dhiver.jpg',
          type: 'image',
        },
      ],
      type: 3,
      geometry: {
        type: 'Point',
        coordinates: [6.2061167, 44.8985958, 1787],
      },
      view_points: [],
    },
    {
      description: 'Test refuge',
      name: 'Refuge de la Lavey',
      id: 3,
      attachments: [],
      type: 8,
      geometry: {
        type: 'Point',
        coordinates: [6.1667321, 44.7604322, 2409],
      },
      view_points: [],
    },
  ],
});

export const mockPoiRoute = (times: number, trekId: number): void =>
  mockRoute({
    route: '/poi/',
    mockData: mockPois(),
    additionalQueries: {
      near_trek: trekId,
      fields: 'id,name,description,attachments,type,geometry,view_points',
      page_size: getGlobalConfig().maxPoiPerPage,
    },
    times,
  });
