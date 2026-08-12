import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';
import { HIDE_CLOSED_TREKS_ID, VIGILANCE_TYPE_ID } from 'modules/filters/constant';
import { DateFilter, FilterState, Option } from 'modules/filters/interface';
import Field from './Field';
import InputDateWithMagnifier from '../InputDateWithMagnifier';

interface Props {
  filtersState: FilterState[];
  dateFilter: DateFilter;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (dFilter: DateFilter) => void;
}

export const VigilanceSection: React.FC<Props> = ({
  filtersState,
  dateFilter,
  setFilterSelectedOptions,
  setDateFilter,
}) => {
  const intl = useIntl();
  const [showPeriod, setShowPeriod] = useState<boolean>(Boolean(dateFilter.endDate));

  const today = new Date().toISOString().split('T')[0];
  const effectiveBeginDate = dateFilter.beginDate || today;

  const vigilanceTypeFilter = filtersState.find(f => f.id === VIGILANCE_TYPE_ID);
  const hideClosedTreksFilter = filtersState.find(f => f.id === HIDE_CLOSED_TREKS_ID);

  const isClosedChecked = (hideClosedTreksFilter?.selectedOptions.length ?? 0) > 0;

  return (
    <div className="my-6 py-5 border-t border-b border-greySoft">
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 items-start">
        {/* Left Column: Date Selection + Closed Treks Switch */}
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
                  label={intl.formatMessage({
                    id: 'search.filters.hikeOnDate',
                    defaultMessage: 'Je randonne le',
                  })}
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
                    label={intl.formatMessage({
                      id: 'search.filters.dateFrom',
                      defaultMessage: 'Je randonne du',
                    })}
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

          <div className="flex items-center gap-3 justify-start">
            <button
              type="button"
              role="switch"
              aria-checked={isClosedChecked}
              onClick={() => {
                if (isClosedChecked) {
                  setFilterSelectedOptions(HIDE_CLOSED_TREKS_ID, []);
                } else {
                  setFilterSelectedOptions(HIDE_CLOSED_TREKS_ID, [{ value: 'true', label: 'true' }]);
                }
              }}
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                isClosedChecked ? 'bg-primary1' : 'bg-greySoft',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  isClosedChecked ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </button>
            <span
              className="font-medium text-greyDarkColored select-none cursor-pointer"
              onClick={() => {
                if (isClosedChecked) {
                  setFilterSelectedOptions(HIDE_CLOSED_TREKS_ID, []);
                } else {
                  setFilterSelectedOptions(HIDE_CLOSED_TREKS_ID, [{ value: 'true', label: 'true' }]);
                }
              }}
            >
              {intl.formatMessage({ id: 'search.filters.hideClosedTreks' })}
            </span>
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
