import { mockRoute } from 'services/testing/utils';

export const mockPois = () => ({
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      description:
        "<span>Pour esp&eacute;rer apercevoir cet oiseau, partir la nuit au printemps, parcourir un grand d&eacute;nivel&eacute; afin d'arriver sur son terrain de pr&eacute;dilection &agrave; plus de 2000 m voire 3000 m d'altitude avant le lever du jour et l&agrave;, entendre le chant guttural&nbsp;caract&eacute;ristique qui trahit sa pr&eacute;sence. Mais pour le voir, il faudra bien ouvrir les yeux ou se munir d'une paire de jumelles. Et alors l&agrave;, quel bonheur&nbsp;! Le lagop&egrave;de alpin est l'esp&egrave;ce arctique par excellence, menac&eacute;e entre autre par le r&eacute;chauffement climatique. Il fait partie des esp&egrave;ces &agrave; prot&eacute;ger dans le c&oelig;ur du Parc national des Ecrins.</span>",
      name: 'Lagopède alpin',
      pictures: [
        {
          author: 'Damien Combrisson - PNE',
          backend: '',
          thumbnail:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-plumage-dhiver.jpg.120x120_q85_crop.jpg',
          legend: "Lagopède alpin en plumage d'hiver",
          title: 'lagopede-alpin-en-plumage-dhiver',
          url:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-plumage-dhiver.jpg',
          type: 'image',
        },
        {
          author: 'Jean-Philippe Telmon - PNE',
          backend: '',
          thumbnail:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-tenue-dete.jpg.120x120_q85_crop.jpg',
          legend: "Lagopède alpin en tenue d'été",
          title: 'lagopede-alpin-en-tenue-dete',
          url:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-tenue-dete.jpg',
          type: 'image',
        },
      ],
      type: 3,
    },
    { description: 'Test refuge', name: 'Refuge de la Lavey', pictures: [], type: 8 },
  ],
});

export const mockPoiRoute = (times: number, trekId: number): void =>
  mockRoute({
    route: '/poi',
    mockData: mockPois(),
    additionalQueries: {
      trek: trekId,
      fields: 'name,description,pictures,type',
    },
    times,
  });
