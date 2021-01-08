import { adaptListActivity } from './adapter';
import { fetchActivities } from './api';
import { Activity } from './interface';

export const getActivities = async (): Promise<Activity[]> => {
  const rawActivities = await fetchActivities({ language: 'fr' });
  return rawActivities.results.map(rawActivity => adaptListActivity(rawActivity, 'fr'));
};
