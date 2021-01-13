import { FilterState } from 'modules/filters/interface';

export enum ActionKind {
  SetFilterValues = 'SET_FILTER_VALUES',
  InitFilterState = 'INIT_FILTER_STATE',
}

type InitFilterStateAction = {
  type: ActionKind.InitFilterState;
  payload: FilterState[];
};

// export const setFilterValuesAction = (
//   filter: BaseFilters | TrekFilters,
//   values: FilterValues,
// ): Action => ({
//   type: ActionKind.SetFilterValues,
//   payload: {
//     filter,
//     values,
//   },
// });

export const filterReducer = (
  state: FilterState[],
  action: InitFilterStateAction,
): FilterState[] => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.InitFilterState:
      return payload;
    default:
      return state;
  }
};
