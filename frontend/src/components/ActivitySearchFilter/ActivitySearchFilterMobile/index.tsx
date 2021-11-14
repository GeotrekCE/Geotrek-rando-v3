import React from 'react';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { CSSObject } from 'styled-components';

import { colorPalette, getSpacing, shadow } from 'stylesheet';
import { routes } from 'services/routes';

import { ActivityFilter } from 'modules/activities/interface';
import { Arrow } from 'components/Icons/Arrow';
import { Link } from 'components/Link';

import { useActivitySearchFilterMobile } from './useActivitySearchFilterMobile';

export const ActivitySearchFilterMobile: React.FC<{
  className?: string;
  activities: ActivityFilter[];
  getId: (type: string) => string;
}> = ({ className, activities, getId }) => {
  const { selectedActivityId, updateSelectedActivityId } = useActivitySearchFilterMobile();

  const selectedActivity = activities.find(
    ({ id, type }) => `${type}-${id}` === selectedActivityId,
  );

  return (
    <div className={`${className ?? ''} flex space-x-4 items-center`}>
      <Select
        className="flex-1"
        options={activities.map(({ id, name, type }) => ({
          value: `${type}-${id}`,
          label: name,
        }))}
        styles={selectStyles}
        isSearchable={false}
        placeholder={<FormattedMessage id="home.selectPlaceholder" />}
        onChange={activity => updateSelectedActivityId(activity?.value ?? null)}
      />
      {selectedActivityId !== null && selectedActivity !== undefined ? (
        <Link
          href={`${routes.SEARCH}?${getId(selectedActivity.type)}=${
            selectedActivityId.split('-')[1]
          }`}
        >
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
  control: (styles: CSSObject) => ({
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
  valueContainer: (styles: CSSObject) => ({
    ...styles,
    padding: 'none',
    overflow: 'visible',
  }),
  singleValue: (styles: CSSObject) => ({
    ...styles,
    color: colorPalette.greyDarkColored,
    paddingLeft: getSpacing(2),
  }),
  menu: (styles: CSSObject) => ({
    ...styles,
    padding: `${getSpacing(2)} 0`,
    margin: 0,
    border: 'none',
    boxShadow: shadow.large,
    borderRadius: getSpacing(2),
  }),
  option: (styles: CSSObject) => ({
    ...styles,
    backgroundColor: 'white',
    paddingLeft: getSpacing(4),
    color: colorPalette.greyDarkColored,
    ':hover': {
      backgroundColor: colorPalette.primary2,
    },
  }),
  indicatorSeparator: () => ({
    color: 'transparent',
  }),
  placeholder: (styles: CSSObject) => ({
    ...styles,
    color: colorPalette.greyDarkColored,
    paddingLeft: '8px',
    ':focus': {
      outline: 'none',
      color: 'white',
    },
  }),
};
