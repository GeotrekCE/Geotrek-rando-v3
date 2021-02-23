import { useState } from 'react';
import { ActivityFilter } from 'modules/activities/interface';
import { useQuery } from 'react-query';

import { useLanguageContext } from 'services/languageContext';
import { getActivityBarContent } from 'modules/activities/connector';

export const useActivitySearchFilter = () => {
  const { language } = useLanguageContext();
  const { data: activities } = useQuery<ActivityFilter[], Error>('homeActivities', () =>
    getActivityBarContent(language),
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
