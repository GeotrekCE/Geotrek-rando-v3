import { EVENT_ID } from 'modules/filters/constant';
import { DateFilter, FilterState, Option } from 'modules/filters/interface';
import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import InputDateWithMagnifier from '../InputDateWithMagnifier';
import ShowFilters from './ShowFilters';

interface Props {
  filters?: {
    [key: string]: FilterState[];
  };
  dateFilter: DateFilter;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (beginDate?: any, endDate?: any) => void;
}

const SubFilterField: React.FC<Props> = ({
  filters,
  dateFilter,
  setFilterSelectedOptions,
  setDateFilter,
}) => {
  if (filters === undefined) {
    return null;
  }

  const intl = useIntl();

  const entriesFilters = Object.entries(filters);

  if (entriesFilters.length === 0) {
    return null;
  }

  if (String(entriesFilters[0][0]) === EVENT_ID) {
    return (
      <>
        <div className="flex flex-col mt-4 desktop:mt-0 desktop:ml-5">
          <div className="font-bold mb-2 text-lg">Agenda</div>
          <InputDateWithMagnifier
            value={dateFilter.beginDate}
            onChange={event => {
              setDateFilter({ beginDate: event.target.value, endDate: dateFilter.endDate });
            }}
            placeholder={intl.formatMessage({ id: 'search.beginDateFilter' })}
          />
          <InputDateWithMagnifier
            value={dateFilter.endDate}
            onChange={event => {
              setDateFilter({ beginDate: dateFilter.beginDate, endDate: event.target.value });
            }}
            placeholder={intl.formatMessage({ id: 'search.endDateFilter' })}
          />
        </div>
      </>
    );
  }

  // Display filter items in a row
  if (entriesFilters.length === 1) {
    return (
      <>
        {entriesFilters.map(([, content], index) => (
          <Fragment key={index}>
            {content.map(filter => (
              <div className="my-1" key={filter.id}>
                <ShowFilters item={filter} setFilterSelectedOptions={setFilterSelectedOptions} />
              </div>
            ))}
          </Fragment>
        ))}
      </>
    );
  }

  // else display each filter in a column
  return (
    <>
      {entriesFilters.map(([title, content], index) => (
        <div className="m-1" key={index}>
          {title !== 'undefined' && <div className={'font-bold mb-2'}>{title}</div>}
          {content.map(filter => (
            <ShowFilters
              key={filter.id}
              item={filter}
              setFilterSelectedOptions={setFilterSelectedOptions}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default SubFilterField;
