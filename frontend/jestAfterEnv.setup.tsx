import '@testing-library/jest-dom';
import nock from 'nock';

jest.mock('./src/components/Map', () => ({
  SearchMapDynamicComponent: () => null,
  DetailsMapDynamicComponent: () => null,
}));

jest.mock('./src/modules/utils/api.config.ts', () => ({
  getApiCallsConfig: () => ({
    searchResultsPageSize: 5,
    mapResultsPageSize: 5,
    portalIds: [1],
    apiUrl: 'https://geotrekdemo.ecrins-parcnational.fr/api/v2',
  }),
}));

// API calls should always be mocked else we might have inconsistencies
// depending on our testing environment
nock.disableNetConnect();

jest.mock('./src/modules/header/utills.ts', () => ({
  getHeaderConfig: () => ({
    logo: '',
    menu: {
      primaryItemsNumber: 3,
      items: [
        {
          translationId: 'header.nationalPark',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.parcHouses',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.usefulInformations',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.biodiv',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.transportation',
          url: 'https://www.ecrins-parcnational.fr/',
        },
        {
          translationId: 'header.yourOpinion',
          url: 'https://www.ecrins-parcnational.fr/',
        },
      ],
      shouldDisplayFavorite: true,
      supportedLanguages: ['fr'],
    },
  }),
  getDefaultLanguage: () => 'fr',
}));

jest.mock('./src/modules/home/utils.ts', () => ({
  getHomePageConfig: () => ({
    pictureAndText: {
      pictureUrl: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_1280.jpg',
      shouldDisplayText: true,
    },
    activityBar: {
      shouldDisplay: true,
    },
    suggestions: [
      {
        titleTranslationId: 'home.territoryTreks',
        iconUrl:
          'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
        ids: ['2'],
      },
    ],
  }),
}));

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
