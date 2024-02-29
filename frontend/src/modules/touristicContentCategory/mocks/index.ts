import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawTouristicContentCategory } from '../interface';

export const mockTouristicContentCategoryResponse =
  (): APIResponseForList<RawTouristicContentCategory> => ({
    count: 8,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        label: 'Hébergements',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-accommodation.svg',
        types: [
          {
            id: 101,
            label: "Type d'usage",
            values: [
              { id: 1, label: 'Camping', pictogram: null },
              { id: 5, label: "Chambre d'hôtes", pictogram: null },
              { id: 4, label: "Gîte d'étape/séjour", pictogram: null },
              { id: 9, label: 'Hébergement insolite', pictogram: null },
              { id: 7, label: 'Hôtel', pictogram: null },
              { id: 59, label: 'Refuge', pictogram: null },
              { id: 8, label: "Table d'hôte", pictogram: null },
              { id: 6, label: 'Village de vacances', pictogram: null },
            ],
          },
          {
            id: 102,
            label: 'Label',
            values: [
              { id: 3, label: 'Certifié', pictogram: null },
              { id: 2, label: 'Panda', pictogram: null },
            ],
          },
        ],
      },
      {
        id: 2,
        label: 'Pleine Nature',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-outdoor.svg',
        types: [
          {
            id: 201,
            label: "Type d'usage",
            values: [
              { id: 12, label: 'Acrobranche', pictogram: null },
              { id: 10, label: 'Activités hivernales', pictogram: null },
              { id: 14, label: 'Canyoning', pictogram: null },
              { id: 17, label: "Course d'orientation", pictogram: null },
              { id: 11, label: 'Escalade', pictogram: null },
              { id: 16, label: 'Pêche à la ligne', pictogram: null },
              { id: 18, label: 'Randonnée', pictogram: null },
              { id: 13, label: 'Via ferrata', pictogram: null },
              { id: 15, label: 'Vol libre', pictogram: null },
            ],
          },
          { id: 202, label: '', values: [] },
        ],
      },
      {
        id: 3,
        label: 'Sorties',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-visits.svg',
        types: [
          {
            id: 301,
            label: "Type d'usage",
            values: [
              { id: 26, label: 'Acrobranche', pictogram: null },
              { id: 34, label: 'Activités hivernales', pictogram: null },
              { id: 24, label: 'Ane', pictogram: null },
              { id: 35, label: 'Autres', pictogram: null },
              { id: 25, label: 'Calèche', pictogram: null },
              { id: 30, label: 'Canoë-Kayak', pictogram: null },
              { id: 29, label: 'Canyoning', pictogram: null },
              { id: 20, label: 'Cyclotourisme', pictogram: null },
              { id: 23, label: 'Equitation', pictogram: null },
              { id: 27, label: 'Escalade', pictogram: null },
              { id: 19, label: 'Pédestre', pictogram: null },
              { id: 36, label: 'Pêche à la ligne', pictogram: null },
              { id: 28, label: 'Spéléologie', pictogram: null },
              { id: 22, label: 'VTT', pictogram: null },
              { id: 31, label: 'Via ferrata', pictogram: null },
              { id: 32, label: 'Vol libre', pictogram: null },
              { id: 33, label: 'Vol à voile', pictogram: null },
            ],
          },
          {
            id: 302,
            label: 'Service',
            values: [
              { id: 38, label: 'Accompagnée', pictogram: null },
              { id: 37, label: 'Libre', pictogram: null },
            ],
          },
        ],
      },
      {
        id: 4,
        label: 'Sites recommandés',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-sites.svg',
        types: [
          {
            id: 401,
            label: "Type d'usage",
            values: [
              { id: 41, label: 'Jardin', pictogram: null },
              { id: 42, label: 'Parc à thèmes', pictogram: null },
              { id: 39, label: 'Site bâti', pictogram: null },
              { id: 40, label: 'Site naturel', pictogram: null },
            ],
          },
          { id: 402, label: '', values: [] },
        ],
      },
      {
        id: 5,
        label: 'Restaurants',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-restaurants.svg',
        types: [
          {
            id: 501,
            label: "Type d'usage",
            values: [
              { id: 44, label: 'Ferme auberge', pictogram: null },
              { id: 43, label: 'Restaurant', pictogram: null },
            ],
          },
          { id: 502, label: '', values: [] },
        ],
      },
      {
        id: 6,
        label: 'Produits',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-products.svg',
        types: [
          {
            id: 601,
            label: "Type d'usage",
            values: [
              { id: 46, label: 'Alimentaire', pictogram: null },
              { id: 45, label: 'Artisanat', pictogram: null },
              { id: 47, label: 'Autres', pictogram: null },
            ],
          },
          { id: 602, label: '', values: [] },
        ],
      },
      {
        id: 7,
        label: 'Séjours',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-destination.svg',
        types: [
          {
            id: 701,
            label: 'Thématique',
            values: [
              { id: 52, label: 'Autres', pictogram: null },
              { id: 49, label: 'Bien être', pictogram: null },
              { id: 51, label: 'Culturel', pictogram: null },
              { id: 50, label: 'Nature', pictogram: null },
              { id: 48, label: 'Randonnée', pictogram: null },
            ],
          },
          { id: 702, label: '', values: [] },
        ],
      },
      {
        id: 8,
        label: 'Musée',
        order: null,
        pictogram:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/touristiccontent-museum.svg',
        types: [
          {
            id: 801,
            label: "Type d'usage",
            values: [
              { id: 58, label: 'Lieu de visite', pictogram: null },
              { id: 57, label: 'Musée', pictogram: null },
              { id: 55, label: "Sentier d'interprétation", pictogram: null },
              { id: 56, label: 'Site bâti', pictogram: null },
              { id: 53, label: 'Site naturel', pictogram: null },
            ],
          },
          { id: 802, label: '', values: [] },
        ],
      },
    ],
  });

export const mockTouristicContentCategoryRoute = (times: number): void =>
  mockRoute({
    route: '/touristiccontent_category/',
    mockData: mockTouristicContentCategoryResponse(),
    additionalQueries: {},
    times,
  });
