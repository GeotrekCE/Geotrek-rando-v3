import { ChevronDown } from 'components/Icons/ChevronDown';
import { MoreHorizontal } from 'components/Icons/MoreHorizontal';
import { Link } from 'components/Link';
import { Activity } from 'modules/activities/interface';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { routes } from 'services/routes';

import { ActivityButton } from './ActivityButton';
import { useActivitySearchFilter } from './useActivitySearchFilter';
import { ActivitySearchFilterMobile } from './ActivitySearchFilterMobile';

interface Props {
  className?: string;
}

const MAX_VISIBLE_ACTIVITIES = 8;

export const ActivitySearchFilter: React.FC<Props> = ({ className }) => {
  const { activities, expandedState, toggleExpandedState } = useActivitySearchFilter();

  const collapseIsNeeded: boolean =
    activities !== undefined && activities.length > MAX_VISIBLE_ACTIVITIES;

  const visibleActivities: Activity[] | undefined =
    collapseIsNeeded && expandedState === 'COLLAPSED'
      ? activities?.slice(0, MAX_VISIBLE_ACTIVITIES)
      : activities;

  return (
    <>
      <div
        className={`px-3 pb-6 bg-white shadow-lg rounded-2xl hidden self-center max-w-activitySearchFilter desktop:flex${
          className ?? ''
        }`}
      >
        <div className="flex content-evenly flex-wrap flex-1">
          {visibleActivities?.map(activity => (
            <Link href={`${routes.SEARCH}?activity=${activity.id}`} key={activity.id}>
              <ActivityButton iconUrl={activity.pictogram} key={activity.id}>
                <span>{activity.name}</span>
              </ActivityButton>
            </Link>
          ))}
        </div>
        {collapseIsNeeded && (
          <div className="self-end cursor-pointer" onClick={toggleExpandedState}>
            <ControlCollapseButton expandedState={expandedState} />
          </div>
        )}
      </div>
      <div className="block desktop:hidden">
        <ActivitySearchFilterMobile activities={activities ?? []} />
      </div>
    </>
  );
};

const ControlCollapseButton: React.FC<{ expandedState: 'EXPANDED' | 'COLLAPSED' }> = ({
  expandedState,
}) => {
  if (expandedState === 'EXPANDED') {
    return <ChevronDown size={48} className="transform rotate-180" />;
  }
  return (
    <div className="flex flex-col items-center mr-4">
      <MoreHorizontal size={48} />
      <FormattedMessage id="home.seeMore" />
    </div>
  );
};
