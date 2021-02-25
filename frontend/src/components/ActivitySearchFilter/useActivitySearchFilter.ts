import { useState } from 'react';
import { ActivityFilter } from 'modules/activities/interface';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getActivityBarContent } from 'modules/activities/connector';

export const useActivitySearchFilter = () => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: activities } = useQuery<ActivityFilter[], Error>(`homeActivities-${language}`, () =>
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
