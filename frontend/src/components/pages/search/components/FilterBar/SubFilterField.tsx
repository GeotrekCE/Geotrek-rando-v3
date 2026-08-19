import { DateFilter, FilterState, Option } from 'modules/filters/interface';
import React, { Fragment } from 'react';
import {
  DATE_FILTER,
  DATE_FILTER_CONTENTS,
  HIDE_CLOSED_CONTENTS_ID,
  HIDE_CLOSED_TREKS_ID,
  VIGILANCE_TYPE_CONTENTS_EXCLUDE_ID,
  VIGILANCE_TYPE_CONTENTS_ID,
  VIGILANCE_TYPE_EXCLUDE_ID,
  VIGILANCE_TYPE_ID,
} from 'modules/filters/constant';
import { getGlobalConfig } from 'modules/utils/api.config';
import ShowFilters from './ShowFilters';

const VIGILANCE_SECTION_IDS = [
  DATE_FILTER,
  HIDE_CLOSED_TREKS_ID,
  VIGILANCE_TYPE_ID,
  VIGILANCE_TYPE_EXCLUDE_ID,
  DATE_FILTER_CONTENTS,
  HIDE_CLOSED_CONTENTS_ID,
  VIGILANCE_TYPE_CONTENTS_ID,
  VIGILANCE_TYPE_CONTENTS_EXCLUDE_ID,
];

interface Props {
  filters?: {
    [key: string]: FilterState[];
  };
  dateFilter: DateFilter;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (dFilter: DateFilter) => void;
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

  const isVigilanceEnabled = getGlobalConfig().enableVigilanceAreas;

  const filteredFilters = Object.entries(filters).reduce((acc, [key, list]) => {
    const validList = list.filter(filter =>
      isVigilanceEnabled ? !VIGILANCE_SECTION_IDS.includes(filter.id) : true,
    );
    if (validList.length > 0) {
      acc[key] = validList;
    }
    return acc;
  }, {} as { [key: string]: FilterState[] });

  const entriesFilters = Object.entries(filteredFilters);

  if (entriesFilters.length === 0) {
    return null;
  }

  // Display filter items in a row
  if (entriesFilters.length === 1) {
    return (
      <>
        {entriesFilters.map(([, content], index) => (
          <Fragment key={index}>
            {content.map(filter => (
              <div className="my-1" key={filter.id}>
                <ShowFilters
                  item={filter}
                  setFilterSelectedOptions={setFilterSelectedOptions}
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                />
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
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default SubFilterField;
