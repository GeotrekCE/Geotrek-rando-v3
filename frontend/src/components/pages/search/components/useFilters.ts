import { FilterState, Option } from 'modules/filters/interface';
import { TouristicContentCategoryHashMap } from 'modules/touristicContentCategory/interface';
import { useState } from 'react';

const getTypeFilterStateForService = ({
  serviceId,
  type,
  hashMap,
}: {
  serviceId: string;
  type: 'type1' | 'type2';
  hashMap: TouristicContentCategoryHashMap;
}): FilterState | null =>
  hashMap[parseInt(serviceId, 10)][type].label === ''
    ? null
    : {
        id: type,
        label: hashMap[parseInt(serviceId, 10)][type].label,
        selectedOptions: [],
        options: hashMap[parseInt(serviceId, 10)][type].values,
        status: 'ENABLED',
        type: 'MULTIPLE',
      };

const isFilterStateNotNull = (filterState: FilterState | null): filterState is FilterState =>
  filterState !== null;

const computeFilterStateWithTypes = ({
  currentState,
  options,
  hashMap,
}: {
  currentState: FilterState[];
  options: Option[];
  hashMap: TouristicContentCategoryHashMap;
}): FilterState[] => {
  const filtersStateWithoutTypes = currentState.filter(
    filterState => filterState.id !== 'type1' && filterState.id !== 'type2',
  );
  if (options.length === 0 || options.length >= 2) return filtersStateWithoutTypes;
  return [
    ...filtersStateWithoutTypes.filter(
      filterState => filterState.id !== 'type1' && filterState.id !== 'type2',
    ),
    getTypeFilterStateForService({
      serviceId: options[0].value,
      type: 'type1',
      hashMap,
    }),
    getTypeFilterStateForService({
      serviceId: options[0].value,
      type: 'type2',
      hashMap,
    }),
  ].filter(isFilterStateNotNull);
};

export const useFilter = (
  initialFiltersState: FilterState[],
  touristicContentHashMap: TouristicContentCategoryHashMap,
) => {
  const [filtersState, setFiltersState] = useState<FilterState[]>(initialFiltersState);

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    setFiltersState(currentState => {
      const filterStateWithTypes =
        filterId === 'service'
          ? computeFilterStateWithTypes({
              currentState,
              options,
              hashMap: touristicContentHashMap,
            })
          : currentState;
      return filterStateWithTypes.map(filterState => {
        if (filterState.id === filterId) {
          return {
            ...filterState,
            selectedOptions: options,
          };
        }
        return filterState;
      });
    });
  };

  return {
    filtersState,
    setFilterSelectedOptions,
  };
};
