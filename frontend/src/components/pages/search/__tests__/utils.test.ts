import { TrekResults } from 'modules/results/interface';
import {
  concatResultsPages,
  formatInfiniteQuery,
  generateResultDetailsUrl,
  parseFilter,
  parseFilters,
  parseSelectedOptions,
} from '../utils';

const MockFilterState = {
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
};
const MockFilterState2 = {
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
};
const MockFilterState3 = {
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
};

const MockSelectedOptions = [
  { value: '1', label: 'Très facile' },
  { value: '3', label: 'Intermédiaire' },
  { value: '5', label: 'Très difficile' },
];

const mockTrekResult = {
  id: 2,
  activityIcon: 'TODO',
  place: 'Molines-en-Champsaur',
  title: 'Col de Font Froide',
  tags: ['Faune', 'Géologie', 'Archéologie et histoire'],
  thumbnailUri:
    'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/le-depart-du-hameau-de-molines.JPG',
  practice: {
    name: 'Pédestre',
    pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
  },
  informations: {
    duration: '7h',
    distance: '15,2km',
    elevation: '+1457m',
    difficulty: {
      label: 'Difficile',
      pictogramUri: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/difficulty-4.svg',
    },
    reservationSystem: null,
  },
};

const mockInfiniteQueryPage = {
  resultsNumber: 6,
  nextPageId: '2',
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

describe('concatResultsPages', () => {
  it('should return null if the pages array is empty', () => {
    const input: TrekResults[] = [];
    const output = concatResultsPages(input);
    const expected = null;

    expect(output).toStrictEqual(expected);
  });

  it('should concat all results from different pages', () => {
    const input = [mockInfiniteQueryPage, mockInfiniteQueryPage];
    const output = concatResultsPages(input);
    const expected = {
      resultsNumber: 6,
      nextPageId: '2',
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
      nextPageId: '2',
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
    const expected = '/details-2-Col-de-Font-Froide';

    expect(output).toBe(expected);
  });
});
