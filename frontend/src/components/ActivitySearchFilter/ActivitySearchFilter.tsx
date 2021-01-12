import { Arrow } from 'components/Icons/Arrow';
import { ChevronDown } from 'components/Icons/ChevronDown';
import { MoreHorizontal } from 'components/Icons/MoreHorizontal';
import { Link } from 'components/Link';
import { Activity } from 'modules/activities/interface';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { routes } from 'services/routes';
import { colorPalette, getSpacing, shadow } from 'stylesheet';

import { ActivityButton } from './ActivityButton';
import { useActivitySearchFilter } from './useActivitySearchFilter';
import { useActivitySearchFilterMobile } from './useActivitySearchFilterMobile';

const adaptActivityForSelect = (activity: Activity): { value: string; label: string } => ({
  value: `${activity.id}`,
  label: activity.name,
});

const ActivitySearchFilterMobile: React.FC<{ className?: string; activities: Activity[] }> = ({
  className,
  activities,
}) => {
  const { selectedActivity, updateSelectedActivity } = useActivitySearchFilterMobile();

  return (
    <div className={`${className ?? ''} flex space-x-4 items-center`}>
      <Select
        className="flex-1"
        options={activities.map(adaptActivityForSelect)}
        styles={selectStyles}
        isSearchable={false}
        placeholder={<FormattedMessage id="home.selectPlaceholder" />}
        onChange={activity => updateSelectedActivity(activity?.value ?? null)}
      />
      {/* TODO update route with active filter using selected activity */}
      {selectedActivity !== null ? (
        <Link href={routes.SEARCH}>
          <ValidateButton />
        </Link>
      ) : (
        <ValidateButton />
      )}
    </div>
  );
};

const ValidateButton: React.FC = () => (
  <div className="bg-primary1 hover:bg-primary1-light shadow-lg text-white rounded-lg p-3.5 cursor-pointer transition-all">
    <Arrow size={24} />
  </div>
);

const selectStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: shadow.large,
    border: 'none',
    padding: getSpacing(2),
    borderRadius: getSpacing(2),
    flexGrow: 1,
    ':focus': {
      border: 'none',
    },
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: 'none',
    overflow: 'visible',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: colorPalette.greyDarkColored,
    paddingLeft: getSpacing(2),
  }),
  menu: (styles: any) => ({
    ...styles,
    padding: `${getSpacing(2)} 0`,
    margin: 0,
    border: 'none',
    boxShadow: shadow.large,
    borderRadius: getSpacing(2),
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    paddingLeft: getSpacing(4),
    color: colorPalette.greyDarkColored,
    ':hover': {
      backgroundColor: colorPalette.primary2,
    },
  }),
  indicatorSeparator: (styles: any) => ({
    color: 'transparent',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: colorPalette.greyDarkColored,
    paddingLeft: '8px',
    ':focus': {
      outline: 'none',
      color: 'white',
    },
  }),
};

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
        className={`px-3 pb-6 bg-white shadow-lg rounded-2xl hidden self-center desktop:flex${
          className ?? ''
        }`}
        style={{ maxWidth: '865px' }}
      >
        <div className="flex content-evenly flex-wrap flex-1">
          {visibleActivities?.map(activity => (
            <Link href={routes.SEARCH} key={activity.id}>
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
