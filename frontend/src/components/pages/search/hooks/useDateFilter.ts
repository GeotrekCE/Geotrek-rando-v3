import { DateFilter } from 'modules/filters/interface';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useDateFilter = (): {
  dateFilter: DateFilter;
  setDateFilter: (dFilter: DateFilter) => void;
} => {
  const initialOptions = useRouter().query;
  const { beginDate = '', endDate = '' } = initialOptions;

  const [dateFilter, setDateFilter] = useState<DateFilter>({
    beginDate: beginDate.toString(),
    endDate: endDate.toString(),
  });

  return {
    dateFilter,
    setDateFilter,
  };
};
