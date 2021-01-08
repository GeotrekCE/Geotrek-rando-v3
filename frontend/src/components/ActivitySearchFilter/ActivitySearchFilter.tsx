import { Activity } from 'components/ActivitySearchFilterMobile/ActivitySearchFilterMobile';
import { Link } from 'components/Link';
import React from 'react';
import { routes } from 'services/routes';

import { ActivityButton } from './ActivityButton';
import { useActivitySearchFilter } from './useActivitySearchFilter';

interface Props {
  className?: string;
  activities: Array<Activity>;
}

export const ActivitySearchFilter: React.FC<Props> = ({ className }) => {
  const { activities } = useActivitySearchFilter();

  return (
    // <ActivitySearchFilterContainer className={className}>
    <div className={`py-7 bg-white shadow-lg rounded-2xl overflow-scroll ${className ?? ''}`}>
      {activities?.map(activity => (
        <Link href={routes.SEARCH} key={activity.id}>
          <ActivityButton iconUrl={activity.pictogram} key={activity.id}>
            <span>{activity.name}</span>
          </ActivityButton>
        </Link>
      ))}
      {/* </ActivitySearchFilterContainer> */}
    </div>
  );
};
