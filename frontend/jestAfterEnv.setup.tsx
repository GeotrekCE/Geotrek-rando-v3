import '@testing-library/jest-dom';
import { HomePageConfig } from './src/modules/home/interface';
import nock from 'nock';
import { setConfig } from 'next/config';

// TextEncoder / TextDecoder APIs are used, but are not provided by
// jsdom, all node versions supported provide these via the util module
if (
  typeof globalThis.TextEncoder === "undefined" ||
  typeof globalThis.TextDecoder === "undefined"
) {
  const utils = require("util");
  globalThis.TextEncoder = utils.TextEncoder;
  globalThis.TextDecoder = utils.TextDecoder;
};

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
    videoUrl: undefined,
  },
  activityBar: {
    shouldDisplay: true,
  },
  suggestions: [
    {
      titleTranslationId: 'home.territoryTreks',
      iconUrl: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
      ids: ['2'],
      type: 'trek'
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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});


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
    details: {
      sections: {
        trek: [      
          { 
            "name": "presentation",
            "display": true,
            "anchor": true,
            "order": 10
          },
          { 
            "name": "itinerancySteps",
            "display": true,
            "anchor": true,
            "order": 20
          },
          { 
            "name": "poi",
            "display": true,
            "anchor": true,
            "order": 30
          },
          { 
            "name": "description",
            "display": true,
            "anchor": true,
            "order": 40
          },
          { 
            "name": "forecastWidget",
            "display": true,
            "anchor": false,
            "order": 50
          },
          { 
            "name": "altimetricProfile",
            "display": true,
            "anchor": false,
            "order": 60
          },
          { 
            "name": "sensitiveAreas",
            "display": true,
            "anchor": true,
            "order": 70
          },
          { 
            "name": "practicalInformations",
            "display": true,
            "anchor": true,
            "order": 80
          },
          { 
            "name": "accessibility",
            "display": true,
            "anchor": true,
            "order": 90
          },
          { 
            "name": "more",
            "display": true,
            "anchor": false,
            "order": 100
          },
          { 
            "name": "source",
            "display": true,
            "anchor": false,
            "order": 110
          },
          { 
            "name": "report",
            "display": true,
            "anchor": false,
            "order": 120
          },
          { 
            "name": "touristicContent",
            "display": true,
            "anchor": true,
            "order": 130
          },
          { 
            "name": "reservationWidget",
            "display": true,
            "anchor": false,
            "order": 140
          }
        ],
        outdoorSite: [],
        outdoorCourse: [],
        touristicContent: [],
        touristicEvent: []
      },
    },
    resultCard: {
      trek: {
        location: {
          display: true,
        },
        themes: {
          display: true,
        },
        labels: {
          display: true,
        },
        informations: ['difficulty', 'duration', 'distance', 'positiveElevation'],
      },
    },
    detailsSectionHtml: {
      forecastWidget: { default: '<iframe\n  id="widget_autocomplete_preview"\n  className="w-full"\n  height="150"\n  src="https://meteofrance.com/widget/prevision/{{ cityCode }}0"\n></iframe>\n' }
    },
    home: {},
    map: {},
    filter: {},
    footer: {},
  },
});
