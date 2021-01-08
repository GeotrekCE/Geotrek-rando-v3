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
        placeholder={<FormattedMessage id="home.selectPlaceholder" />}
        onChange={activity => updateSelectedActivity(activity?.value ?? null)}
      />
      {/* TODO update route with active filter using selected activity */}
      {selectedActivity !== null ? (
        <Link href={routes.SEARCH}>{validateButtonStatic}</Link>
      ) : (
        validateButtonStatic
      )}
    </div>
  );
};

const validateButtonStatic = (
  <div className="bg-primary1 hover:bg-primary3 text-white shadow-lg rounded-lg p-3.5 cursor-pointer">
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
  menu: (styles: any) => ({
    ...styles,
    margin: 0,
    border: 'none',
    boxShadow: shadow.large,
    borderRadius: getSpacing(2),
    // borderTopLeftRadius: 0,
    // borderTopRightRadius: 0,
  }),
  option: (styles: any) => {
    return {
      ...styles,
      backgroundColor: colorPalette.filter.background,
      color: colorPalette.greyDarkColored,
      ':hover': {
        backgroundColor: colorPalette.primary2,
      },
    };
  },
  input: (styles: any) => ({
    ...styles,
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: colorPalette.greyDarkColored,
    padding: 'none',
    ':focus': {
      outline: 'none',
    },
  }),
};
