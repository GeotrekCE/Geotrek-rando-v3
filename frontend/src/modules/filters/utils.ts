import { getConfigOld, getFilterConfig } from './config';
import { getDifficulties } from './connector/index';
import {
  AvailableFilter,
  AvailableFilters,
  BaseFilters,
  Choices,
  DisplayableAvailableFilters,
  DisplayableFilter,
  Filter,
  RawFilterConfig,
  TrekFilters,
} from './interface';

const mapIdToConnector: {
  [filterId: string]: () => Promise<Choices>;
} = {
  difficulty: getDifficulties,
};

const getAPIFilters = async (): Promise<AvailableFilter[]> => {
  const apiFilters: AvailableFilter[] = [];
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  Object.keys(mapIdToConnector).forEach(async filterId => {
    const choices = await mapIdToConnector[filterId]();
    apiFilters.push({
      id: filterId,
      choices,
    });
  });
  return apiFilters;
};

const adaptRawFilterConfigToAvailableFilter = async (
  rawFilterConfig: RawFilterConfig,
): Promise<AvailableFilter | null> => {
  if (rawFilterConfig.choices !== undefined) {
    return {
      id: rawFilterConfig.id,
      choices: rawFilterConfig.choices.map(choice => ({
        value: `${choice.minValue}`,
        label: choice.label,
      })),
    };
  }
  if (mapIdToConnector[rawFilterConfig.id] !== undefined) {
    return {};
  }
  return null;
};

const getAvailableFilters = async (): Promise<AvailableFilter[]> => {
  const config = getFilterConfig();
  const availableFilters: AvailableFilter[] = [];
  config.forEach(async rawFilterConfig => {
    const adaptedFilter = await adaptRawFilterConfigToAvailableFilter(rawFilterConfig);
    if (adaptedFilter !== null) {
      availableFilters.push(adaptedFilter);
    }
  });
  return availableFilters;
};

console.log(getAvailableFilters());

const getAvailableFiltersOld = async (): Promise<AvailableFilters> => {
  const config = getConfigOld();

  const difficulties = await getDifficulties();

  return {
    [BaseFilters.ACTIVITIES]: {
      ...config[BaseFilters.ACTIVITIES],
      choices: {},
    },
    [BaseFilters.CITY]: {
      ...config[BaseFilters.CITY],
      choices: {},
    },
    [BaseFilters.DISTRICT]: {
      ...config[BaseFilters.DISTRICT],
      choices: {},
    },
    [BaseFilters.THEME]: {
      ...config[BaseFilters.THEME],
      choices: {},
    },
    [TrekFilters.DIFFICULTY]: {
      ...config[TrekFilters.DIFFICULTY],
      choices: difficulties,
    },
    [TrekFilters.COURSE_TYPE]: {
      ...config[TrekFilters.COURSE_TYPE],
      choices: {},
    },
    [TrekFilters.ACCESSIBILITY]: {
      ...config[TrekFilters.ACCESSIBILITY],
      choices: {},
    },
    [TrekFilters.DURATION]: {
      ...config[TrekFilters.DURATION],
    },
    [TrekFilters.LENGTH]: {
      ...config[TrekFilters.LENGTH],
    },
    [TrekFilters.POSITIVE_ELEVATION]: {
      ...config[TrekFilters.POSITIVE_ELEVATION],
    },
  };
};

const adaptAvailableFilters = (
  filter: Filter,
): { label: string; options: DisplayableFilter[] } => ({
  label: filter.label,
  options: Object.keys(filter.choices).map(difficultyId => ({
    value: difficultyId,
    label: filter.choices[difficultyId].label,
  })),
});

export const getDisplayableAvailableFilters = async (): Promise<DisplayableAvailableFilters> => {
  const availableFilters = await getAvailableFiltersOld();
  return {
    [BaseFilters.ACTIVITIES]: adaptAvailableFilters(availableFilters[BaseFilters.ACTIVITIES]),
    [BaseFilters.CITY]: adaptAvailableFilters(availableFilters[BaseFilters.CITY]),
    [BaseFilters.DISTRICT]: adaptAvailableFilters(availableFilters[BaseFilters.DISTRICT]),
    [BaseFilters.THEME]: adaptAvailableFilters(availableFilters[BaseFilters.THEME]),
    [TrekFilters.DIFFICULTY]: adaptAvailableFilters(availableFilters[TrekFilters.DIFFICULTY]),
    [TrekFilters.COURSE_TYPE]: adaptAvailableFilters(availableFilters[TrekFilters.COURSE_TYPE]),
    [TrekFilters.ACCESSIBILITY]: adaptAvailableFilters(availableFilters[TrekFilters.ACCESSIBILITY]),
    [TrekFilters.DURATION]: adaptAvailableFilters(availableFilters[TrekFilters.DURATION]),
    [TrekFilters.LENGTH]: adaptAvailableFilters(availableFilters[TrekFilters.LENGTH]),
    [TrekFilters.POSITIVE_ELEVATION]: adaptAvailableFilters(
      availableFilters[TrekFilters.POSITIVE_ELEVATION],
    ),
  };
};
