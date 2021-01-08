import { getActivities } from 'modules/activities/connector';
import { useQuery } from 'react-query';

export const useActivitySearchFilter = () => {
  const { data: activities } = useQuery('activities', getActivities);

  return { activities };
};
