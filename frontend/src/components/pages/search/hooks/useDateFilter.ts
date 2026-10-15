import { DateFilter } from 'modules/filters/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useDateFilter = (): {
  trekDateFilter: DateFilter;
  setTrekDateFilter: (dateFilter: DateFilter) => void;
  contentDateFilter: DateFilter;
  setContentDateFilter: (dateFilter: DateFilter) => void;
} => {
  const router = useRouter();
  const initialOptions = router?.query ?? {};
  const {
    beginDate = '',
    endDate = '',
    beginDateContent = '',
    endDateContent = '',
  } = initialOptions;

  const defaultDate = getGlobalConfig().enableVigilanceAreas
    ? new Date().toISOString().split('T')[0]
    : '';

  const [trekDateFilter, setTrekDateFilter] = useState<DateFilter>({
    beginDate: beginDate ? beginDate.toString() : defaultDate,
    endDate: endDate.toString(),
  });

  const [contentDateFilter, setContentDateFilter] = useState<DateFilter>({
    beginDate: beginDateContent ? beginDateContent.toString() : defaultDate,
    endDate: endDateContent.toString(),
  });

  return {
    trekDateFilter,
    setTrekDateFilter,
    contentDateFilter,
    setContentDateFilter,
  };
};
