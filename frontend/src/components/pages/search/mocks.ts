export const mockTrekResponse = {
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
};

export const mockDifficultyResponse = {
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      cirkwi_level: 1,
      label: 'Très facile',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-1.svg',
    },
    {
      id: 2,
      cirkwi_level: 2,
      label: 'Facile',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-2.svg',
    },
    {
      id: 3,
      cirkwi_level: 3,
      label: 'Intermédiaire',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-3.svg',
    },
    {
      id: 4,
      cirkwi_level: 4,
      label: 'Difficile',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-4.svg',
    },
    {
      id: 5,
      cirkwi_level: 5,
      label: 'Très difficile',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-5.svg',
    },
  ],
};

export const mockThemeResponse = {
  count: 10,
  next: null,
  previous: null,
  results: [
    {
      id: 5,
      label: 'Architecture',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-architecture.png',
    },
    {
      id: 11,
      label: 'Archéologie et histoire',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-history.png',
    },
    {
      id: 1,
      label: 'Faune',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-fauna.png',
    },
    {
      id: 2,
      label: 'Flore',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-flora.png',
    },
    {
      id: 7,
      label: 'Géologie',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-geology.png',
    },
    {
      id: 8,
      label: 'Lac et glacier',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-lake.png',
    },
    {
      id: 6,
      label: 'Pastoralisme',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-pastoral.png',
    },
    {
      id: 4,
      label: 'Point de vue',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-panorama.png',
    },
    {
      id: 10,
      label: 'Refuge',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-refugee.png',
    },
    {
      id: 9,
      label: 'Sommet',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/theme-peak.png',
    },
  ],
};

export const mockPracticeResponse = {
  count: 4,
  next: null,
  previous: null,
  results: [
    {
      id: 3,
      name: 'Cheval',
      order: null,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-horse.svg',
    },
    {
      id: 4,
      name: 'Pédestre',
      order: null,
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
    },
    {
      id: 1,
      name: 'VTT',
      order: null,
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-mountainbike.svg',
    },
    {
      id: 2,
      name: 'Vélo',
      order: null,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-bike.svg',
    },
  ],
};

export const mockRouteResponse = {
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 2,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/route-return.svg',
      route: 'Aller-retour',
    },
    {
      id: 1,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/route-loop.svg',
      route: 'Boucle',
    },
    {
      id: 5,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/route-stage-2.svg',
      route: 'Etape',
    },
    {
      id: 4,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/route-roaming-2.svg',
      route: 'Itinérance',
    },
    {
      id: 3,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/route-cross.svg',
      route: 'Traversée',
    },
  ],
};

export const mockAccessibilityResponse = {
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
};

export const mockStructureResponse = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 3,
      name: 'CD32',
    },
    {
      id: 1,
      name: 'PNE',
    },
    {
      id: 2,
      name: 'PNM',
    },
  ],
};
