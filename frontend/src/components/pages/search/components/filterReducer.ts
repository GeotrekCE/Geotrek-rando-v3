import {
  BaseFilters,
  DisplayableFilter,
  RangeFilters,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';

enum ActionKind {
  SetFilterValues = 'SET_FILTER_VALUES',
}

type Action = {
  type: ActionKind;
  payload: {
    filter: BaseFilters | TrekFilters | RangeFilters;
    values: DisplayableFilter[] | null;
  };
};

export const setFilterValuesAction = (
  filter: BaseFilters | TrekFilters | RangeFilters,
  values: DisplayableFilter[] | null,
): Action => ({
  type: ActionKind.SetFilterValues,
  payload: {
    filter,
    values,
  },
});

export const filterReducer = (state: SelectedFilters, action: Action): SelectedFilters => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.SetFilterValues:
      return {
        ...state,
        [payload.filter]: payload.values ?? [],
      };
    default:
      return state;
  }
};
