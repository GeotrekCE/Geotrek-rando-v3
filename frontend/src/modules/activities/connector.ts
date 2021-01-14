import { Filter } from 'modules/filters/interface';
import { adaptActivities, adaptActivityFilter } from './adapter';
import { fetchActivities } from './api';
import { ActivityChoices } from './interface';

export const getActivities = async (): Promise<ActivityChoices> => {
  const rawActivities = await fetchActivities({ language: 'fr' });
  return adaptActivities(rawActivities.results);
};

export const getActivityFilter = async (): Promise<Filter> => {
  const rawActivities = await fetchActivities({ language: 'fr' });
  return adaptActivityFilter(rawActivities.results);
};
