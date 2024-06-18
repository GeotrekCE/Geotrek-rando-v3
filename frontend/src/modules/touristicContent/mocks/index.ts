import { getGlobalConfig } from 'modules/utils/api.config';
import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawTouristicContentDetailsProperties } from '../interface';

export const mockTouristicContentResponse =
  (): APIResponseForList<RawTouristicContentDetailsProperties> => ({
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        id: '257',
        attachments: [
          {
            author: '',
            backend: '',
            thumbnail:
              'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/tourism_touristiccontent/257/4948000.jpg.120x120_q85_crop.jpg',
            legend: 'Auberge Gaillard',
            title: '',
            url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/tourism_touristiccontent/257/4948000.jpg',
            type: 'image',
            filetype: {
              id: 1,
              type: 'Topoguide',
            },
          },
          {
            author: '',
            backend: '',
            thumbnail:
              'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/tourism_touristiccontent/257/4948001.jpg.120x120_q85_crop.jpg',
            legend: 'Auberge Gaillard',
            title: '',
            url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/tourism_touristiccontent/257/4948001.jpg',
            type: 'image',
            filetype: {
              id: 1,
              type: 'Topoguide',
            },
          },
          {
            author: '',
            backend: '',
            thumbnail:
              'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/tourism_touristiccontent/257/4947999.jpg.120x120_q85_crop.jpg',
            legend: 'Auberge Gaillard',
            title: '',
            url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/tourism_touristiccontent/257/4947999.jpg',
            type: 'image',
            filetype: {
              id: 1,
              type: 'Topoguide',
            },
          },
        ],
        approved: false,
        category: 1,
        description:
          "Nicolas et Julien vous accueillent dans un cadre de nature luxuriante au bord des ruisseaux pour venir vous reposer, vous ressourcer et prendre le temps de vivre. Pour l’hébergement, vous trouverez des chambres et petits dortoirs thématisés sur la vie du siècle passé. Et, à votre table, c'est une cuisine inventive basée sur d'anciennes recettes de grands-mères, de cuisine française, de cuisine bio et mondiale revisitée à la sauce contemporaine que nous vous faisons découvrir avec des produits frais du terroir et d'ailleurs.<br>Accès de plain pied pour les personnes à mobilité réduite.<br>Idéal pour les groupes, réunions de familles, séminaires, soirées d'anniversaire ou mariage.<br>Expositions d'art et d'artisanat permanentes.<br><br>Loisirs à proximité : pêche, golf, randonnée, VTT, baignade, équitation, parcours aventure, ski alpin, ski de fond.",
        description_teaser:
          "L'auberge propose, dans un hameau de montagne en bout de route, en pleine nature, un hébergement de séjour, nuitée, demi-pension et pension complète dans un décor de la vie d'antan et d'aujourd'hui.",
        practical_info:
          "<b>Ouverture:</b><br>En juillet et août et aux vacances de Noël et de février, ouvert tous les jours. Autres périodes, ouvert du mercredi au dimanche.<br><br><b>Capacité totale:</b><br>24<br><br><b>Tarifs:</b><br>Du 21/12/2019 au 03/04/2020<br>Nuitée : de 25 à 70 €.<br><br>Du 05/04 au 10/04/2020<br>Nuitée : de 25 à 60 €.<br><br>Du 12/04 au 17/04/2020<br>Nuitée : de 25 à 60 €.<br><br>Du 19/04 au 24/04/2020<br>Nuitée : de 25 à 60 €.<br><br>Du 26/04 au 18/12/2020<br>Nuitée : de 25 à 70 €.<br><br>Du 19/12/2020 au 02/04/2021<br>Nuitée : de 25 à 70 €.<br><br>Du 04/04 au 09/04/2021<br>Nuitée : de 25 à 60 €.<br><br>Du 11/04 au 16/04/2021<br>Nuitée : de 25 à 60 €.<br><br>Du 18/04 au 23/04/2021<br>Nuitée : de 25 à 60 €.<br><br>Du 25/04 au 17/12/2021<br>Nuitée : de 25 à 70 €.<br><br><b>Modes de paiement:</b><br>Chèque, Espèces, Chèque Vacances<br><br><b>Services:</b><br>Accès Internet Wifi, Table d'hôtes, Restauration<br><br><i>Fiche mise à jour par Gîtes de France Hautes-Alpes le 24/02/2020</i>",
        cities: ['05090'],
        name: 'Auberge Gaillard',
        pdf: 'https://geotrekdemo.ecrins-parcnational.fr/api/fr/touristiccontents/257/auberge-gaillard_booklet.pdf',
        source: [3],
        themes: [],
        types: { '101': [4], '102': [] },
        contact:
          'Molines en Champsaur<br>05500 La Motte-en-Champsaur<br>Tél. 04 92 43 40 99 / 06 09 30 07 47',
        email: 'auberge-gaillard@orange.fr',
        website: 'http://www.gites-de-france-hautes-alpes.com/fiche-hebergement-4161.html',
        geometry: {
          type: 'Point',
          coordinates: [6.336837, 45.042721],
        },
        bbox: [6.336837, 45.042721],
      },
    ],
  });

export const mockTouristicContentRoute = (times: number, nearTrekId: number): void =>
  mockRoute({
    route: '/touristiccontent/',
    mockData: mockTouristicContentResponse(),
    additionalQueries: {
      fields: 'id,attachments,name,category,description_teaser,geometry',
      near_trek: nearTrekId,
      page_size: getGlobalConfig().maxTouristicContentPerPage,
    },
    times,
  });
