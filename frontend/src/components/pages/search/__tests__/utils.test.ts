import { FilterState } from 'modules/filters/interface';
import { SearchResults, TrekResult } from 'modules/results/interface';
import {
  concatResultsPages,
  formatInfiniteQuery,
  generateResultDetailsUrl,
  parseFilter,
  parseFilters,
  parseSelectedOptions,
  parseTextFilter,
} from '../utils';

const MockFilterState: FilterState = {
  id: 'difficulty',
  options: [
    { value: '1', label: 'Très facile' },
    { value: '2', label: 'Facile' },
    { value: '3', label: 'Intermédiaire' },
    { value: '4', label: 'Difficile' },
    { value: '5', label: 'Très difficile' },
  ],
  label: 'search.filters.difficulty',
  selectedOptions: [
    { value: '3', label: 'Intermédiaire' },
    { value: '4', label: 'Difficile' },
  ],
  type: 'MULTIPLE',
};
const MockFilterState2: FilterState = {
  id: 'difficulty2',
  options: [
    { value: '2', label: 'Facile' },
    { value: '3', label: 'Intermédiaire' },
    { value: '4', label: 'Difficile' },
    { value: '5', label: 'Très difficile' },
  ],
  label: 'search.filters.difficulty',
  selectedOptions: [
    { value: '1', label: 'Très facile' },
    { value: '3', label: 'Intermédiaire' },
    { value: '4', label: 'Difficile' },
  ],
  type: 'MULTIPLE',
};
const MockFilterState3: FilterState = {
  id: 'difficulty3',
  options: [
    { value: '1', label: 'Très facile' },
    { value: '2', label: 'Facile' },
    { value: '3', label: 'Intermédiaire' },
    { value: '4', label: 'Difficile' },
    { value: '5', label: 'Très difficile' },
  ],
  label: 'search.filters.difficulty',
  selectedOptions: [
    { value: '2', label: 'Facile' },
    { value: '4', label: 'Difficile' },
  ],
  type: 'MULTIPLE',
};

const MockSelectedOptions = [
  { value: '1', label: 'Très facile' },
  { value: '3', label: 'Intermédiaire' },
  { value: '5', label: 'Très difficile' },
];

const mockTrekResult: TrekResult = {
  id: '2',
  type: 'TREK',
  place: 'Molines-en-Champsaur',
  name: 'Col de Font Froide',
  tags: ['Faune', 'Géologie', 'Archéologie et histoire'],
  images: [
    {
      url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/le-depart-du-hameau-de-molines.JPG',
      author: 'Lorem Ipsum',
      legend: 'Lorem Ipsum',
    },
  ],
  category: {
    id: '',
    label: 'Pédestre',
    pictogramUri:
      'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
  },
  informations: [
    {
      label: 'difficulty',
      value: 'Difficile',
      pictogramUri: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-4.svg',
    },
    { label: 'duration', value: '7h' },

    { label: 'distance', value: '15,2km' },
    { label: 'positiveElevation', value: '+1457m' },
  ],
};

const mockInfiniteQueryPage = {
  resultsNumber: 6,
  resultsNumberDetails: {
    treksCount: 4,
    touristicContentsCount: 2,
    outdoorSitesCount: 0,
    touristicEventsCount: 0,
  },
  nextPages: { treks: 3, touristicContents: 3, outdoorSites: 0, touristicEvents: 0 },
  previousPages: { treks: 1, touristicContents: 1, outdoorSites: 0, touristicEvents: 0 },
  results: [mockTrekResult, mockTrekResult],
};

const mockInfiniteQueryData = {
  pageParams: [undefined],
  pages: [mockInfiniteQueryPage, mockInfiniteQueryPage],
};

describe('parseSelectedOptions', () => {
  it('should properly transform a selected options array from filterStates', () => {
    const input = MockSelectedOptions;
    const output = parseSelectedOptions(input);
    const expected = ['1', '3', '5'];
    expect(output).toStrictEqual(expected);
  });
});

describe('parseFilter', () => {
  it('should properly transform a FilterState', () => {
    const input = MockFilterState;
    const output = parseFilter(input);
    const expected = {
      id: 'difficulty',
      selectedOptions: ['3', '4'],
    };
    expect(output).toStrictEqual(expected);
  });
});

describe('parseFilters', () => {
  it('should properly transform a FilterState array', () => {
    const input = [MockFilterState, MockFilterState2, MockFilterState3];
    const output = parseFilters(input);
    const expected = [
      {
        id: 'difficulty',
        selectedOptions: ['3', '4'],
      },
      {
        id: 'difficulty2',
        selectedOptions: ['1', '3', '4'],
      },
      {
        id: 'difficulty3',
        selectedOptions: ['2', '4'],
      },
    ];
    expect(output).toStrictEqual(expected);
  });
});

describe('parseTextFilter', () => {
  test.each`
    textfilter              | expectedParsedTextFilter
    ${'col de font froide'} | ${'col de font froide'}
    ${null}                 | ${''}
  `('parses text filter properly with $textfilter', ({ textfilter, expectedParsedTextFilter }) => {
    const formattedText = parseTextFilter(textfilter as string | null);

    expect(formattedText).toEqual(expectedParsedTextFilter);
  });
});

describe('concatResultsPages', () => {
  it('should return null if the pages array is empty', () => {
    const input: SearchResults[] = [];
    const output = concatResultsPages(input);
    const expected = null;

    expect(output).toStrictEqual(expected);
  });

  it('should concat all results from different pages', () => {
    const input = [mockInfiniteQueryPage, mockInfiniteQueryPage];
    const output = concatResultsPages(input);
    const expected = {
      resultsNumber: 6,
      resultsNumberDetails: {
        treksCount: 4,
        touristicContentsCount: 2,
        outdoorSitesCount: 0,
        touristicEventsCount: 0,
      },
      nextPages: { treks: 3, touristicContents: 3, outdoorSites: 0, touristicEvents: 0 },
      previousPages: { treks: 1, touristicContents: 1, outdoorSites: 0, touristicEvents: 0 },
      results: [mockTrekResult, mockTrekResult, mockTrekResult, mockTrekResult],
    };

    expect(output).toStrictEqual(expected);
  });
});

describe('formatInfiniteQuery', () => {
  it('should return null if infiniteQueryData is undefined', () => {
    const input = undefined;
    const output = formatInfiniteQuery(input);
    const expected = null;

    expect(output).toStrictEqual(expected);
  });

  it('should concat all results from different pages', () => {
    const input = mockInfiniteQueryData;
    const output = formatInfiniteQuery(input);
    const expected = {
      resultsNumber: 6,
      resultsNumberDetails: {
        treksCount: 4,
        touristicContentsCount: 2,
        outdoorSitesCount: 0,
        touristicEventsCount: 0,
      },
      nextPages: { treks: 3, touristicContents: 3, outdoorSites: 0, touristicEvents: 0 },
      previousPages: { treks: 1, touristicContents: 1, outdoorSites: 0, touristicEvents: 0 },
      results: [mockTrekResult, mockTrekResult, mockTrekResult, mockTrekResult],
    };

    expect(output).toStrictEqual(expected);
  });
});

describe('generateResultDetailsUrl', () => {
  it('should correctly generate an url', () => {
    const id = 2;
    const title = 'Col de Font Froide';
    const output = generateResultDetailsUrl(id, title);
    const expected = '/trek/2-Col-de-Font-Froide';

    expect(output).toBe(expected);
  });
});
