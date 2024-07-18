import { useState } from 'react';
import { ActivityFilter } from 'modules/activities/interface';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getActivityBarContent } from 'modules/activities/connector';
import { getHomePageConfig } from 'modules/home/utils';

const { activityBar } = getHomePageConfig();

export const useActivitySearchFilter = () => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: activities } = useQuery<ActivityFilter[], Error>({
    queryKey: ['homeActivities', language],
    queryFn: () => getActivityBarContent(language, activityBar.links),
  });

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
