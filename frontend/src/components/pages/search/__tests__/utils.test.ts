import { parseFilter, parseFilters, parseSelectedOptions } from '../utils';

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
