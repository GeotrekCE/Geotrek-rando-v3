import { DateFilter } from 'modules/filters/interface';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useDateFilter = (): {
  trekDateFilter: DateFilter;
  setTrekDateFilter: (dFilter: DateFilter) => void;
  contentDateFilter: DateFilter;
  setContentDateFilter: (dFilter: DateFilter) => void;
} => {
  const initialOptions = useRouter().query;
  const {
    beginDate = '',
    endDate = '',
    beginDateContent = '',
    endDateContent = '',
  } = initialOptions;

  const [trekDateFilter, setTrekDateFilter] = useState<DateFilter>({
    beginDate: beginDate.toString(),
    endDate: endDate.toString(),
  });

  const [contentDateFilter, setContentDateFilter] = useState<DateFilter>({
    beginDate: beginDateContent.toString(),
    endDate: endDateContent.toString(),
  });

  return {
    trekDateFilter,
    setTrekDateFilter,
    contentDateFilter,
    setContentDateFilter,
  };
};
