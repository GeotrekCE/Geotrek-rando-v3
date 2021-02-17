import { useState } from 'react';
import { ActivityChoices } from 'modules/activities/interface';
import { useQuery } from 'react-query';

import { getActivities } from '../../modules/activities/connector';

export const useActivitySearchFilter = (language: string) => {
  const { data: activities } = useQuery<ActivityChoices, Error>('homeActivities', () =>
    getActivities(language),
  );

  const [expandedState, setExpandedState] = useState<'EXPANDED' | 'COLLAPSED'>('COLLAPSED');

  const toggleExpandedState = () =>
    setExpandedState(currentExpandedState =>
      currentExpandedState === 'EXPANDED' ? 'COLLAPSED' : 'EXPANDED',
    );

  return {
    activities,
    expandedState,
    toggleExpandedState,
  };
};
