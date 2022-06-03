import '@testing-library/jest-dom';
import { HomePageConfig } from './src/modules/home/interface';
import nock from 'nock';
import { setConfig } from 'next/config';

jest.mock('./src/components/Map', () => ({
  SearchMapDynamicComponent: () => null,
  DetailsMapDynamicComponent: () => null,
}));

jest.mock('./src/modules/utils/api.config.ts', () => ({
  getGlobalConfig: () => ({
    searchResultsPageSize: 5,
    mapResultsPageSize: 5,
    maxPoiPerPage: 50,
    maxTouristicContentPerPage: 50,
    portalIds: [1],
    apiUrl: 'https://geotrekdemo.ecrins-parcnational.fr/api/v2',
    googleAnalyticsId: 'G-8FSV2N4FXN',
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
    headerTopHtml: {
      default: undefined,
      fr: undefined,
    },
    headerBottomHtml: {
      default: undefined,
      fr: undefined,
    }
  }),
  getDefaultLanguage: () => 'fr',
}));

const mockConfig: HomePageConfig = {
  welcomeBanner: {
    pictureUrl: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_1280.jpg',
    shouldDisplayText: true,
    videoUrl: null,
  },
  activityBar: {
    shouldDisplay: true,
  },
  suggestions: [
    {
      titleTranslationId: 'home.territoryTreks',
      iconUrl: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
      ids: ['2'],
    },
  ],
};

jest.mock('./src/modules/home/utils.ts', () => ({
  getHomePageConfig: () => mockConfig,
}));

jest.mock('screenfull', () => ({
  onchange: jest.fn(),
  on: jest.fn(),
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

setConfig({
  publicRuntimeConfig: {
    homeBottomHtml: '',
    homeTopHtml: '',
    headerTopHtml: '',
    headerBottomHtml: '',
    footerTopHtml: '',
    footerBottomHtml: '',
    scriptsHeaderHtml: '',
    scriptsFooterHtml: '',
    style: '',
    colors: {},
    header: {},
    global: {},
    home: {},
    map: {},
    filter: {},
    footer: {},
  },
});
