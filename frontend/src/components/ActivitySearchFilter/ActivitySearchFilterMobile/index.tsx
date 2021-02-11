import React from 'react';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

import { colorPalette, getSpacing, shadow } from 'stylesheet';
import { routes } from 'services/routes';
import { PRACTICE_ID } from 'modules/filters/constant';

import { ActivityChoices } from 'modules/activities/interface';
import { Arrow } from 'components/Icons/Arrow';
import { Link } from 'components/Link';

import { useActivitySearchFilterMobile } from './useActivitySearchFilterMobile';

const adaptActivityForSelect = (activities: ActivityChoices) => (
  activityId: string,
): { value: string; label: string } => ({
  value: activityId,
  label: activities[activityId].name,
});

export const ActivitySearchFilterMobile: React.FC<{
  className?: string;
  activities: ActivityChoices;
}> = ({ className, activities }) => {
  const { selectedActivity, updateSelectedActivity } = useActivitySearchFilterMobile();

  return (
    <div className={`${className ?? ''} flex space-x-4 items-center`}>
      <Select
        className="flex-1"
        options={Object.keys(activities).map(adaptActivityForSelect(activities))}
        styles={selectStyles}
        isSearchable={false}
        placeholder={<FormattedMessage id="home.selectPlaceholder" />}
        onChange={activity => updateSelectedActivity(activity?.value ?? null)}
      />
      {selectedActivity !== null ? (
        <Link href={`${routes.SEARCH}?${PRACTICE_ID}=${selectedActivity}`}>
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
