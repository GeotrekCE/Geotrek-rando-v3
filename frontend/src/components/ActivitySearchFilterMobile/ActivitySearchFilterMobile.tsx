/* eslint-disable @typescript-eslint/no-unsafe-return */
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { colorPalette, getSpacing, shadow } from 'stylesheet';
import { routes } from 'services/routes';
import { Link } from 'components/Link';
import { Arrow } from '../Icons/Arrow';
import { useActivitySearchFilterMobile } from './useActivitySearchFilterMobile';

export interface Activity {
  value: string;
  label: string;
}

export interface ActivitySearchFilterMobileProps {
  className?: string;
  activities: Array<Activity>;
}

const selectAll = { label: 'Tout voir', value: 'all' };

export const ActivitySearchFilterMobile: React.FC<ActivitySearchFilterMobileProps> = ({
  className,
  activities,
}) => {
  const { selectedActivity, updateSelectedActivity } = useActivitySearchFilterMobile();

  return (
    <div className={`${className ?? ''} flex space-x-4 items-center`}>
      <Select
        className="flex-1"
        options={[...activities, selectAll]}
        styles={selectStyles}
        isSearchable={false}
        placeholder={<FormattedMessage id="home.selectPlaceholder" />}
        onChange={activity => updateSelectedActivity(activity?.value ?? null)}
      />
      {/* TODO update route with active filter using selected activity */}
      {selectedActivity !== null ? (
        <Link href={routes.SEARCH}>{validateButton}</Link>
      ) : (
        validateButton
      )}
    </div>
  );
};

const validateButton = (
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
