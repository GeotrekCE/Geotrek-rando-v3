import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { OutdoorRatingMapping } from '../../outdoorRating/interface';
import { OutdoorRatingScale } from '../../outdoorRatingScale/interface';
import { FilterState } from '../interface';
import { computeFiltersToDisplay } from '../utils';

const initialFiltersState: FilterState[] = [
  {
    id: 'practices',
    options: [
      {
        value: '3',
        label: 'Cheval',
        pictogramUrl: '',
      },
    ],
    type: 'MULTIPLE',
    label: 'search.filters.practices',
    selectedOptions: [],
  },
  {
    id: 'categories',
    options: [{ value: '1', label: '' }],
    type: 'MULTIPLE',
    label: 'search.filters.categories',
    selectedOptions: [],
  },
  {
    id: 'themes',
    options: [{ value: '5', label: '' }],
    type: 'MULTIPLE',
    label: 'search.filters.theme',
    selectedOptions: [],
  },
  {
    id: 'cities',
    options: [{ value: '05004', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.city',
    selectedOptions: [],
  },
  {
    id: 'districts',
    options: [{ value: '0', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.district',
    selectedOptions: [],
  },
  {
    id: 'structures',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'difficulty',
    options: [{ value: '0', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'duration',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'length',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'ascent',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'routes',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'accessibilities',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
];

const trekSpecificFiltersState: FilterState[] = [
  {
    id: 'difficulty',
    options: [{ value: '0', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'duration',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'length',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'ascent',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'routes',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'accessibilities',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
];

const touristicContentSpecificFiltersState: FilterState[] = [
  {
    id: 'type1',
    options: [{ value: '0', label: '' }],
    type: 'SINGLE',
    label: '',
    selectedOptions: [],
  },
  {
    id: 'type2',
    options: [{ value: '1', label: '' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
];

const filtersState: FilterState[] = [
  {
    id: 'practices',
    options: [
      {
        value: '3',
        label: 'Cheval',
        pictogramUrl: '',
      },
    ],
    type: 'MULTIPLE',
    label: 'search.filters.practices',
    selectedOptions: [],
  },
  {
    id: 'categories',
    options: [{ value: '1', label: 'Hébergements' }],
    type: 'MULTIPLE',
    label: 'search.filters.categories',
    selectedOptions: [],
  },
  {
    id: 'themes',
    options: [{ value: '5', label: 'Architecture' }],
    type: 'MULTIPLE',
    label: 'search.filters.theme',
    selectedOptions: [],
  },
  {
    id: 'cities',
    options: [{ value: '05004', label: 'Ancelle' }],
    type: 'SINGLE',
    label: 'search.filters.city',
    selectedOptions: [],
  },
  {
    id: 'districts',
    options: [{ value: '3', label: 'Briançonnais' }],
    type: 'SINGLE',
    label: 'search.filters.district',
    selectedOptions: [],
  },
  {
    id: 'structures',
    options: [{ value: '1', label: 'PNE' }],
    type: 'SINGLE',
    label: 'search.filters.structure',
    selectedOptions: [],
  },
  {
    id: 'outdoorPractice',
    options: [{ value: '4', label: 'Escalade' }],
    type: 'MULTIPLE',
    label: 'search.filters.outdoorPractice',
    selectedOptions: [],
  },
];

const touristicContentCategoryMapping: TouristicContentCategoryMapping = {
  1: [
    {
      id: '1',
      label: 'Type de truc',
      values: [{ value: '1', label: 'Camping' }],
    },
    {
      id: '2',
      label: 'Label',
      values: [{ value: '3', label: 'Certifié' }],
    },
  ],
  2: [
    {
      id: '101',
      label: 'Type de truc',
      values: [{ value: '1', label: 'Camping' }],
    },
    {
      id: '102',
      label: 'Label',
      values: [{ value: '3', label: 'Certifié' }],
    },
  ],
};

const outdoorRatingMapping: OutdoorRatingMapping = {
  1: [{ id: '1', name: 'Facile', description: '', scale: 1, order: 1, color: '' }],
};

const outdoorRatingScale: OutdoorRatingScale[] = [{ id: '1', name: 'Niveau', practice: 4 }];

const trekSpecificFilters = [
  'difficulty',
  'duration',
  'length',
  'ascent',
  'routes',
  'accessibilities',
];
const touristicContentSpecificFilters = ['type1', 'type2'];
const commonFilters = [
  'practices',
  'categories',
  'themes',
  'cities',
  'districts',
  'structures',
  'outdoorPractice',
];

describe.only('computeFiltersToDisplay', () => {
  it('should return state with treks if user select one practice', () => {
    const currentState = [...filtersState];
    currentState[0].selectedOptions = [
      {
        label: '',
        value: '0',
      },
    ];
    currentState[1].selectedOptions = [];
    currentState[6].selectedOptions = [];
    const displayedIds = computeFiltersToDisplay({
      currentFiltersState: currentState,
      initialFiltersState,
      selectedFilterId: 'practices',
      touristicContentCategoryMapping,
      outdoorRatingScale,
      outdoorRatingMapping,
    }).map(({ id }) => id);
    [...commonFilters, ...trekSpecificFilters].forEach(id => expect(displayedIds.includes(id)));

    expect(displayedIds.length).toEqual([...commonFilters, ...trekSpecificFilters].length);
  });

  it('should return state with TC if user select one practice', () => {
    const currentState = [...filtersState, ...touristicContentSpecificFiltersState];
    currentState[0].selectedOptions = [];
    currentState[1].selectedOptions = [
      {
        label: '',
        value: '1',
      },
    ];
    currentState[6].selectedOptions = [];
    const displayedIds = computeFiltersToDisplay({
      currentFiltersState: currentState,
      initialFiltersState,
      selectedFilterId: 'practices',
      touristicContentCategoryMapping,
      outdoorRatingScale,
      outdoorRatingMapping,
    }).map(({ id }) => id);
    commonFilters.forEach(id => expect(displayedIds.includes(id)));
    expect(displayedIds.length).toEqual(
      [...commonFilters, ...touristicContentSpecificFilters].length,
    );
  });

  it('should return state without treks and without TC if there is no practices selected and no services selected', () => {
    const currentState = [...filtersState, ...trekSpecificFiltersState];
    currentState[0].selectedOptions = [];
    currentState[1].selectedOptions = [];
    currentState[6].selectedOptions = [];
    const displayedIds = computeFiltersToDisplay({
      currentFiltersState: currentState,
      initialFiltersState,
      selectedFilterId: 'practices',
      touristicContentCategoryMapping,
      outdoorRatingScale,
      outdoorRatingMapping,
    }).map(({ id }) => id);
    commonFilters.forEach(id => expect(displayedIds.includes(id)));
    expect(displayedIds.length).toEqual(commonFilters.length);
  });

  it('should return state with TC and Treks if user select at least one practice and at least one service', () => {
    const currentState = [...filtersState];
    currentState[0].selectedOptions = [
      {
        label: '',
        value: '0',
      },
    ];
    currentState[1].selectedOptions = [
      {
        label: '',
        value: '1',
      },
    ];
    currentState[6].selectedOptions = [];
    const displayedIds = computeFiltersToDisplay({
      currentFiltersState: currentState,
      initialFiltersState,
      selectedFilterId: 'practices',
      touristicContentCategoryMapping,
      outdoorRatingScale,
      outdoorRatingMapping,
    }).map(({ id }) => id);

    const data = [...commonFilters, ...touristicContentSpecificFilters, ...trekSpecificFilters];
    data.forEach(id => expect(displayedIds.includes(id)));
    expect(displayedIds.length).toEqual(data.length);
  });
});
