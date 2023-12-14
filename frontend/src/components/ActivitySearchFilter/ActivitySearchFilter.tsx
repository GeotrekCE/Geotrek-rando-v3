import { ChevronDown } from 'components/Icons/ChevronDown';
import { MoreHorizontal } from 'components/Icons/MoreHorizontal';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { routes } from 'services/routes';
import { ActivityFilter } from 'modules/activities/interface';
import { CATEGORY_ID, EVENT_ID, OUTDOOR_ID, PRACTICE_ID } from 'modules/filters/constant';

import { ActivityButton } from './ActivityButton';
import { useActivitySearchFilter } from './useActivitySearchFilter';
import { ActivitySearchFilterMobile } from './ActivitySearchFilterMobile';

interface Props {
  className?: string;
  itemsToDisplayBeforeTruncation: number;
}

export const ActivitySearchFilter: React.FC<Props> = ({
  className,
  itemsToDisplayBeforeTruncation = 8,
}) => {
  const { activities, expandedState, toggleExpandedState } = useActivitySearchFilter();

  const collapseIsNeeded: boolean =
    activities !== undefined && activities.length > itemsToDisplayBeforeTruncation;

  const visibleActivities: ActivityFilter[] | undefined =
    activities !== undefined
      ? collapseIsNeeded && expandedState === 'COLLAPSED'
        ? activities.slice(0, itemsToDisplayBeforeTruncation)
        : activities
      : undefined;

  const getId = (type: string) => {
    if (type === 'PRACTICE') return PRACTICE_ID;
    if (type === 'OUTDOOR_PRACTICE') return OUTDOOR_ID;
    if (type === 'TOURISTIC_EVENT_TYPE') return EVENT_ID;

    return CATEGORY_ID;
  };

  return (
    <div>
      {activities !== undefined && (
        <>
          <div
            className={`px-3 pb-6 bg-white shadow-lg rounded-2xl hidden self-center max-w-activitySearchFilter desktop:flex${
              className ?? ''
            }`}
          >
            <div className="flex content-evenly flex-wrap flex-1 items-center">
              {visibleActivities?.map(activity => (
                <ActivityButton
                  iconUrl={activity.pictogramUri}
                  href={`${routes.SEARCH}?${getId(activity.type)}=${activity.id}`}
                  key={`${activity.type}-${activity.id}`}
                  label={activity.label}
                />
              ))}
            </div>
            {collapseIsNeeded && (
              <button
                type="button"
                className="self-end hover:text-primary3 transition-colors text-greyDarkColored"
                onClick={toggleExpandedState}
              >
                <ControlCollapseButton expandedState={expandedState} />
              </button>
            )}
          </div>
          <div className="block desktop:hidden">
            <ActivitySearchFilterMobile activities={activities ?? []} getId={getId} />
          </div>
        </>
      )}
    </div>
  );
};

const ControlCollapseButton: React.FC<{ expandedState: 'EXPANDED' | 'COLLAPSED' }> = ({
  expandedState,
}) => {
  if (expandedState === 'EXPANDED') {
    return <ChevronDown size={48} className="rotate-180" />;
  }
  return (
    <div className="flex flex-col items-center mr-4 text-P2">
      <MoreHorizontal size={48} />
      <FormattedMessage id="home.seeMore" />
    </div>
  );
};
