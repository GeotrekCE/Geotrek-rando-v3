import { useState } from 'react';
import { Activity } from 'modules/activities/interface';
import { useQuery } from 'react-query';

import { getActivities } from '../../modules/activities/connector';

export const useActivitySearchFilter = () => {
  const { data: activities } = useQuery<Activity[], Error>('activities', getActivities);

  const [expandedState, setExpandedState] = useState<'EXPANDED' | 'COLLAPSED'>('COLLAPSED');

  return { activities, expandedState, setExpandedState };
};
