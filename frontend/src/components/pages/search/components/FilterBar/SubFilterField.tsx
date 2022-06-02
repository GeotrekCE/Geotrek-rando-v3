import { FilterState, Option } from 'modules/filters/interface';
import React, { Fragment } from 'react';
import ShowFilters from './ShowFilters';

interface Props {
  filters?: {
    [key: string]: FilterState[];
  };
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
}

const SubFilterField: React.FC<Props> = ({ filters, setFilterSelectedOptions }) => {
  if (filters === undefined) {
    return null;
  }

  const entriesFilters = Object.entries(filters);

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
