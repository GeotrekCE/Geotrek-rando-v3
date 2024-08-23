import { ChevronDown } from 'components/Icons/ChevronDown';
import { MoreHorizontal } from 'components/Icons/MoreHorizontal';
import { FormattedMessage, useIntl } from 'react-intl';
import { routes } from 'services/routes';
import { ActivityFilter } from 'modules/activities/interface';
import { CATEGORY_ID, EVENT_ID, OUTDOOR_ID, PRACTICE_ID } from 'modules/filters/constant';

import { cn } from 'services/utils/cn';
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
  const intl = useIntl();

  const getId = (type: string | null) => {
    if (type === 'PRACTICE') return PRACTICE_ID;
    if (type === 'OUTDOOR_PRACTICE') return OUTDOOR_ID;
    if (type === 'TOURISTIC_EVENT_TYPE') return EVENT_ID;
    if (type === 'CATEGORIES') return CATEGORY_ID;

    return null;
  };

  if (!activities) {
    return null;
  }

  const collapseIsNeeded: boolean = activities.length > itemsToDisplayBeforeTruncation;

  const visibleActivities: ActivityFilter[] =
    collapseIsNeeded && expandedState === 'COLLAPSED'
      ? activities.slice(0, itemsToDisplayBeforeTruncation)
      : activities;

  return (
    <nav role="navigation">
      <div
        className={cn(
          'px-3 pb-6 bg-white shadow-lg rounded-2xl hidden self-center max-w-activitySearchFilter desktop:flex',
          className,
        )}
      >
        <div className="flex content-evenly flex-wrap flex-1 items-center">
          {visibleActivities.map(activity => (
            <ActivityButton
              iconUrl={activity.pictogramUri}
              href={`${routes.SEARCH}?${getId(activity.type)}=${activity.id}`}
              key={`${activity.type}-${activity.id}`}
              label={
                activity.titleTranslationId
                  ? intl.formatMessage({ id: activity.titleTranslationId })
                  : activity.label
              }
              type={activity.type}
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
      <div className="block desktop:hidden relative z-20">
        <ActivitySearchFilterMobile activities={activities} getId={getId} />
      </div>
    </nav>
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
