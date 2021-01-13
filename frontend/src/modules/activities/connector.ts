import { Filter } from 'modules/filters/interface';
import { adaptActivityFilter } from './adapter';
import { fetchActivities } from './api';
import { Activity } from './interface';

export const getActivities = async (): Promise<Activity[]> => {
  const rawActivities = await fetchActivities({ language: 'fr' });
  return rawActivities.results;
};

export const getActivityFilter = async (): Promise<Filter> => {
  const rawActivities = await fetchActivities({ language: 'fr' });
  return adaptActivityFilter(rawActivities.results);
};
