import { adaptActivities, adaptActivity, adaptActivityFilter } from './adapter';
import { fetchActivities, fetchActivity } from './api';
import { Activity, ActivityChoices } from './interface';

export const getActivities = async (language?: string): Promise<ActivityChoices> => {
  const rawActivities = await fetchActivities({ language: language ?? 'fr' });
  return adaptActivities(rawActivities.results);
};

export const getActivityFilter = async () => {
  const rawActivities = await fetchActivities({ language: 'fr' });
  return adaptActivityFilter(rawActivities.results);
};

export const getActivity = async (id: number): Promise<Activity> => {
  const rawActivity = await fetchActivity({ language: 'fr' }, id);
  return adaptActivity(rawActivity);
};
