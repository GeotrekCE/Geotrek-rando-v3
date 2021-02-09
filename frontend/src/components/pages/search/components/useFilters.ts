import { FilterState, Option } from 'modules/filters/interface';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { useState } from 'react';

const getTypeFilterStateForService = ({
  serviceId,
  type,
  touristicContentCategoryMapping,
}: {
  serviceId: string;
  type: 'type1' | 'type2';
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
}): FilterState | null =>
  touristicContentCategoryMapping[parseInt(serviceId, 10)][type].label === ''
    ? null
    : {
        id: type,
        label: touristicContentCategoryMapping[parseInt(serviceId, 10)][type].label,
        selectedOptions: [],
        options: touristicContentCategoryMapping[parseInt(serviceId, 10)][type].values,
        status: 'ENABLED',
        type: 'MULTIPLE',
      };

const isFilterStateNotNull = (filterState: FilterState | null): filterState is FilterState =>
  filterState !== null;

const computeFilterStateWithTypes = ({
  currentState,
  options,
  touristicContentCategoryMapping,
}: {
  currentState: FilterState[];
  options: Option[];
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
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
      touristicContentCategoryMapping,
    }),
    getTypeFilterStateForService({
      serviceId: options[0].value,
      type: 'type2',
      touristicContentCategoryMapping,
    }),
  ].filter(isFilterStateNotNull);
};

export const useFilter = (
  initialFiltersState: FilterState[],
  touristicContentCategoryMapping: TouristicContentCategoryMapping,
) => {
  const [filtersState, setFiltersState] = useState<FilterState[]>(initialFiltersState);

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    setFiltersState(currentState => {
      const filterStateWithTypes =
        filterId === 'service'
          ? computeFilterStateWithTypes({
              currentState,
              options,
              touristicContentCategoryMapping,
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
