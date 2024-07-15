import { useQuery } from '@tanstack/react-query';
import { getAPIVersion } from 'modules/APIVersion/connector';
import { APIVersion } from 'modules/APIVersion/interface';
import { isLowerOrEqualCurrentAPIVersion } from 'modules/APIVersion/utils';
import {
  CATEGORY_ID,
  CITY_ID,
  DATE_FILTER,
  DISTRICT_ID,
  EVENT_ID,
  ORGANIZER_ID,
  OUTDOOR_ID,
  PRACTICE_ID,
  STRUCTURE_ID,
  THEME_ID,
} from 'modules/filters/constant';
import { FilterCategory } from 'modules/filters/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import { FormattedMessage } from 'react-intl';

export const useFilterBar = () => {
  const { groupTreksAndOutdoorFilters, enableOutdoor } = getGlobalConfig();

  const { data: currentAPIVersion } = useQuery<APIVersion | undefined>(
    ['APIVersion'],
    getAPIVersion,
  );

  const is2_108LowerOrEqualCurrentAPIVersion = isLowerOrEqualCurrentAPIVersion(
    '2.108.0',
    currentAPIVersion,
  );

  const treksAndOutdoorCategories =
    groupTreksAndOutdoorFilters === true && enableOutdoor === true
      ? [
          {
            id: PRACTICE_ID,
            name: [
              <FormattedMessage key="practices" id={'search.filters.practices'} />,
              <FormattedMessage key="outdoors" id={'search.filters.outdoorPractice'} />,
            ],
            filters: [PRACTICE_ID, OUTDOOR_ID],
            subFilters: [
              [
                'difficulty',
                'duration',
                'length',
                'routes',
                'ascent',
                'accessibilities',
                is2_108LowerOrEqualCurrentAPIVersion ? 'networks' : '',
                'labels',
              ].filter(Boolean),
              ['type-outdoorRating-.+'],
            ],
          },
        ]
      : [
          {
            id: PRACTICE_ID,
            name: <FormattedMessage id={'search.filters.practices'} />,
            filters: [PRACTICE_ID],
            subFilters: [
              'difficulty',
              'duration',
              'length',
              'routes',
              'ascent',
              'accessibilities',
              is2_108LowerOrEqualCurrentAPIVersion ? 'networks' : '',
              'labels',
            ].filter(Boolean),
          },
          {
            id: OUTDOOR_ID,
            name: <FormattedMessage id={'search.filters.outdoorPractice'} />,
            filters: [OUTDOOR_ID],
            subFilters: ['type-outdoorRating-.+'],
          },
        ];

  const FILTERS_CATEGORIES: FilterCategory[] = [
    ...treksAndOutdoorCategories,
    {
      id: CATEGORY_ID,
      name: <FormattedMessage id={'search.filters.categories'} />,
      filters: [CATEGORY_ID],
      subFilters: ['type-services-.+'],
    },
    {
      id: EVENT_ID,
      name: <FormattedMessage id={'search.filters.event'} />,
      filters: [EVENT_ID],
      subFilters: [DATE_FILTER, ORGANIZER_ID],
    },
    {
      id: THEME_ID,
      name: <FormattedMessage id={'search.filters.themes'} />,
      filters: [THEME_ID],
    },
    {
      id: 'localization',
      name: <FormattedMessage id={'search.filters.localization'} />,
      subFilters: [CITY_ID, DISTRICT_ID, STRUCTURE_ID],
    },
  ];

  return { FILTERS_CATEGORIES };
};
