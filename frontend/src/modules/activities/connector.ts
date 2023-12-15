import { FilterWithoutType } from 'modules/filters/interface';
import { adaptTouristicContentCategoryList } from 'modules/touristicContentCategory/adapter';
import { fetchTouristicContentCategories } from 'modules/touristicContentCategory/api';
import { sortedByOrder } from 'modules/utils/array';
import { ActivityBar, ActivityBarLinks } from 'modules/home/interface';
import { adaptOutdoorPracticesForActivities } from '../outdoorPractice/adapter';
import { fetchOutdoorPractices } from '../outdoorPractice/api';
import { adaptTouristicEventTypesForActivities } from '../touristicEventType/adapter';
import { fetchTouristicEventTypes } from '../touristicEventType/api';
import { getGlobalConfig } from '../utils/api.config';
import {
  adaptActivities,
  adaptActivitiesFilter,
  adaptActivity,
  adaptActivityFilter,
} from './adapter';
import { fetchActivities, fetchActivity } from './api';
import { Activity, ActivityChoices, ActivityFilter } from './interface';

export const getActivities = async (language: string): Promise<ActivityChoices> => {
  const rawActivities = await fetchActivities({ language });
  return adaptActivities(rawActivities.results);
};

export const getActivityFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawActivities = await fetchActivities({ language });
  return adaptActivityFilter(rawActivities.results);
};

export const getActivity = async (
  id: number | null,
  language: string,
): Promise<Activity | null> => {
  // Activity id is not supposed to be null in database, but it already happened. This case has to be taken into account
  if (id === null) {
    return null;
  }
  const rawActivity = await fetchActivity({ language }, id);
  return adaptActivity(rawActivity);
};

export const getActivityBarContent = async (
  language: string,
  links: ActivityBar['links'],
): Promise<ActivityFilter[]> => {
  const getActivitiesAccordingToType = ({ type, ...config }: ActivityBarLinks) => {
    if (type === 'trek') {
      return fetchActivities({ language }).then(({ results }) =>
        adaptActivitiesFilter(results, config).sort(sortedByOrder),
      );
    }
    if (type === 'outdoorSite' && getGlobalConfig().enableOutdoor) {
      return fetchOutdoorPractices({ language }).then(({ results }) =>
        adaptOutdoorPracticesForActivities(results, config).sort(sortedByOrder),
      );
    }
    if (type === 'touristicContent') {
      return fetchTouristicContentCategories({ language }).then(({ results }) =>
        adaptTouristicContentCategoryList(results, config).sort(sortedByOrder),
      );
    }
    if (type === 'touristicEvent' && getGlobalConfig().enableTouristicEvents) {
      return fetchTouristicEventTypes({ language }).then(({ results }) =>
        adaptTouristicEventTypesForActivities(results, config).sort(sortedByOrder),
      );
    }
    return [];
  };

  const activityFilters = await Promise.all(
    links.map(async item => await getActivitiesAccordingToType(item)),
  );

  return activityFilters.flat();
};
