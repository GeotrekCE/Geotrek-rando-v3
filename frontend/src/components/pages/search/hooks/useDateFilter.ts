import { DateFilter } from 'modules/filters/interface';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useDateFilter = (): {
  dateFilter: DateFilter;
  setDateFilter: (dFilter: DateFilter) => void;
} => {
  const initialOptions = useRouter().query;

  const beginDate = initialOptions.beginDate ? initialOptions.beginDate.toString() : '';
  const endDate = initialOptions.endDate ? initialOptions.endDate.toString() : '';

  const [dateFilter, setDateFilterState] = useState<DateFilter>({ beginDate, endDate });

  const setDateFilter = (dFilter: DateFilter) => {
    setDateFilterState(dFilter);
  };

  return {
    dateFilter,
    setDateFilter,
  };
};
