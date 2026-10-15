import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  CATEGORY_ID,
  VIGILANCE_TYPE_CONTENTS_ID,
  VIGILANCE_TYPE_ID,
} from 'modules/filters/constant';
import { DateFilter, FilterState, Option } from 'modules/filters/interface';
import Field from './Field';
import InputDateWithMagnifier from '../InputDateWithMagnifier';

interface Props {
  filtersState: FilterState[];
  dateFilter: DateFilter;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (dFilter: DateFilter) => void;
  filterId?: string;
}

export const VigilanceSection: React.FC<Props> = ({
  filtersState,
  dateFilter,
  setFilterSelectedOptions,
  setDateFilter,
  filterId,
}) => {
  const intl = useIntl();
  const [showPeriod, setShowPeriod] = useState<boolean>(Boolean(dateFilter.endDate));

  const today = new Date().toISOString().split('T')[0];
  const effectiveBeginDate = dateFilter.beginDate || today;

  const isTouristicContent = filterId === CATEGORY_ID;
  const targetVigilanceTypeId = isTouristicContent ? VIGILANCE_TYPE_CONTENTS_ID : VIGILANCE_TYPE_ID;

  const vigilanceTypeFilter = filtersState.find(filter => filter.id === targetVigilanceTypeId);

  const dateSingleLabel =
    isTouristicContent && intl.messages['search.filters.searchOnDate']
      ? intl.formatMessage({ id: 'search.filters.searchOnDate' })
      : isTouristicContent
      ? 'À la date du'
      : intl.formatMessage({
          id: 'search.filters.hikeOnDate',
          defaultMessage: 'Je randonne le',
        });

  const dateFromLabel =
    isTouristicContent && intl.messages['search.filters.searchDateFrom']
      ? intl.formatMessage({ id: 'search.filters.searchDateFrom' })
      : isTouristicContent
      ? 'Du'
      : intl.formatMessage({
          id: 'search.filters.dateFrom',
          defaultMessage: 'Je randonne du',
        });

  return (
    <div className="my-6 py-5 border-t border-b border-greySoft">
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 items-start">
        {/* Left Column: Date Selection */}
        <div className="flex flex-col gap-4">
          <div>
            {!showPeriod ? (
              <div className="flex flex-col sm:flex-row sm:items-end justify-start gap-2 sm:gap-4">
                <InputDateWithMagnifier
                  value={effectiveBeginDate}
                  onChange={event =>
                    setDateFilter({
                      beginDate: event.target.value,
                      endDate: '',
                    })
                  }
                  label={dateSingleLabel}
                />
                <div className="h-auto sm:h-10 desktop:h-12 mb-2 sm:mb-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPeriod(true)}
                    className="text-primary1 font-medium hover:underline text-sm whitespace-nowrap cursor-pointer"
                  >
                    +{' '}
                    {intl.formatMessage({
                      id: 'search.filters.addPeriod',
                      defaultMessage: 'Ajouter une période',
                    })}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-start">
                <div className="flex flex-row flex-wrap items-end justify-start gap-3">
                  <InputDateWithMagnifier
                    value={effectiveBeginDate}
                    onChange={event =>
                      setDateFilter({
                        beginDate: event.target.value,
                        endDate: dateFilter.endDate,
                      })
                    }
                    label={dateFromLabel}
                  />
                  <InputDateWithMagnifier
                    value={dateFilter.endDate}
                    onChange={event =>
                      setDateFilter({
                        beginDate: effectiveBeginDate,
                        endDate: event.target.value,
                      })
                    }
                    label={intl.formatMessage({
                      id: 'search.filters.dateTo',
                      defaultMessage: 'Au',
                    })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowPeriod(false);
                    setDateFilter({ beginDate: effectiveBeginDate, endDate: '' });
                  }}
                  className="text-greyDarkColored text-xs hover:underline cursor-pointer"
                >
                  -{' '}
                  {intl.formatMessage({
                    id: 'search.filters.removePeriod',
                    defaultMessage: 'Retirer la période',
                  })}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Vigilance Area Types */}
        {vigilanceTypeFilter && (
          <div>
            <div className="font-bold text-lg mb-3">
              {intl.formatMessage({ id: 'search.filters.vigilance_type' })}
            </div>
            <Field
              filterState={vigilanceTypeFilter}
              onSelect={(options, include = true) => {
                const id =
                  include !== true
                    ? `${vigilanceTypeFilter.id}_exclude`
                    : vigilanceTypeFilter.id.replace('_exclude', '');
                const filteredOptions = options.filter(option => option.include === include);
                setFilterSelectedOptions(id, filteredOptions);
              }}
              hideLabel
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default VigilanceSection;
