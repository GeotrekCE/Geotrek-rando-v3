import { adaptTouristicContentCategoryList } from 'modules/touristicContentCategory/adapter';
import { fetchTouristicContentCategories } from 'modules/touristicContentCategory/api';
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

export const getActivity = async (id: number, language: string): Promise<Activity> => {
  const rawActivity = await fetchActivity({ language }, id);
  return adaptActivity(rawActivity);
};

export const getActivityBarContent = async (language?: string): Promise<ActivityFilter[]> => {
  const [rawPractices, rawTouristicContentCategories] = await Promise.all([
    fetchActivities({ language: language ?? 'fr' }),
    fetchTouristicContentCategories({ language: language ?? 'fr' }),
  ]);
  return [
    ...adaptActivitiesFilter(rawPractices.results),
    ...adaptTouristicContentCategoryList(rawTouristicContentCategories.results),
  ];
};
