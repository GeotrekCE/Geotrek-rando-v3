import { Activity } from 'components/ActivitySearchFilterMobile/ActivitySearchFilterMobile';
import { Link } from 'components/Link';
import React from 'react';
import { routes } from 'services/routes';
import { Walking } from '../Icons/Walking';
import { ActivityButton } from './ActivityButton';
interface Props {
  className?: string;
  activities: Array<Activity>;
}

export const ActivitySearchFilter: React.FC<Props> = ({ className, activities }) => {
  return (
    <div className={`py-7 bg-white shadow-lg rounded-2xl overflow-scroll ${className ?? ''}`}>
      {activities.map(activity => (
        <Link href={routes.SEARCH} key={activity.value}>
          <ActivityButton icon={Walking} key={activity.value}>
            {activity.label}
          </ActivityButton>
        </Link>
      ))}
    </div>
  );
};
