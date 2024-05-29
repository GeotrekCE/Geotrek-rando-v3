import Select, { CSSObjectWithLabel } from 'react-select';
import { FormattedMessage, useIntl } from 'react-intl';

import { routes } from 'services/routes';

import { ActivityFilter } from 'modules/activities/interface';
import { Arrow } from 'components/Icons/Arrow';
import { Link } from 'components/Link';

import { useActivitySearchFilterMobile } from './useActivitySearchFilterMobile';

export const ActivitySearchFilterMobile: React.FC<{
  className?: string;
  activities: ActivityFilter[];
  getId: (type: string) => string | null;
}> = ({ className = '', activities, getId }) => {
  const { selectedActivityId, updateSelectedActivityId } = useActivitySearchFilterMobile();
  const intl = useIntl();

  const selectedActivity = activities.find(
    ({ id, type }) => `${type}-${id}` === selectedActivityId,
  );

  const hrefParams =
    selectedActivityId !== null && selectedActivity !== undefined
      ? `?${getId(selectedActivity.type)}=${selectedActivityId.split('-')[1]}`
      : '';

  return (
    <div className={`${className} flex space-x-4 items-center`}>
      <Select
        className="flex-1"
        classNames={classNameStyles}
        options={activities.map(({ id, label, titleTranslationId, type }) => ({
          value: `${type}-${id}`,
          label: titleTranslationId ? intl.formatMessage({ id: titleTranslationId }) : label,
        }))}
        styles={selectStyles}
        instanceId="activitySearchFilterMobile"
        isSearchable={false}
        placeholder={<FormattedMessage id="home.selectPlaceholder" />}
        onChange={activity => updateSelectedActivityId(activity?.value ?? null)}
      />
      <Link
        href={`${routes.SEARCH}${hrefParams}`}
        className="bg-primary1 hover:bg-primary1-light focus:bg-primary1-light shadow-lg !text-white rounded-lg p-3.5 transition"
      >
        <Arrow size={24} aria-hidden />
        <span className="sr-only">
          <FormattedMessage id="search.title" />
        </span>
      </Link>
    </div>
  );
};

const selectStyles = {
  control: () => ({}),
  valueContainer: () => ({}),
  singleValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
  }),
  menu: (styles: CSSObjectWithLabel) => ({
    ...styles,
  }),
  option: (styles: CSSObjectWithLabel) => ({
    ...styles,
  }),
  indicatorSeparator: () => ({}),
};

const classNameStyles = {
  control: () => 'flex bg-white shadow-lg p-2 rounded-md',
  valueContainer: () => 'flex-1 grid items-center',
  singleValue: () => 'pl-2 text-greyDarkColored',
  menu: () => 'py-2 !m-0 border-0 !shadow-lg rounded-md',
  option: () => 'pl-4 !text-greyDarkColored !bg-white hover:!bg-primary2',
  indicatorSeparator: () => 'text-transparent',
  placeholder: () => 'pl-2 text-greyDarkColored',
};
