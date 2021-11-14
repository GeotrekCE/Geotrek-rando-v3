import { adaptTouristicContentCategoryList } from 'modules/touristicContentCategory/adapter';
import { fetchTouristicContentCategories } from 'modules/touristicContentCategory/api';
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

export const getActivityFilter = async (language: string) => {
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

export const getActivityBarContent = async (language: string): Promise<ActivityFilter[]> => {
  const [rawPractices, rawTouristicContentCategories, rawOutdoorPractices, rawTouristicEvents] =
    await Promise.all([
      fetchActivities({ language }),
      fetchTouristicContentCategories({ language }),
      getGlobalConfig().enableOutdoor ? fetchOutdoorPractices({ language }) : null,
      getGlobalConfig().enableTouristicEvents ? fetchTouristicEventTypes({ language }) : null,
    ]);

  return [
    ...adaptActivitiesFilter(rawPractices.results),
    ...adaptOutdoorPracticesForActivities(rawOutdoorPractices ? rawOutdoorPractices.results : []),
    ...adaptTouristicContentCategoryList(rawTouristicContentCategories.results),
    ...adaptTouristicEventTypesForActivities(rawTouristicEvents ? rawTouristicEvents.results : []),
  ];
};
