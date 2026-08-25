import { IntlShape } from 'react-intl';

export const getMonthName = (monthNum: number, language: string): string => {
  const date = new Date(2026, monthNum - 1, 1);
  return date.toLocaleDateString(language, { month: 'long' });
};

export const getDayName = (dayNum: number, language: string): string => {
  // 1 = Monday, 7 = Sunday
  const date = new Date(2026, 0, 4 + dayNum);
  return date.toLocaleDateString(language, { weekday: 'long' });
};

export const formatActiveMonths = (
  months: (number | string)[],
  intl: IntlShape,
  language: string,
): string => {
  if (!months || months.length === 0) return '';
  const sorted = [...months].map(Number).sort((a, b) => a - b);
  const isConsecutive =
    sorted.length > 1 && sorted.every((m, idx) => idx === 0 || m === sorted[idx - 1] + 1);

  if (isConsecutive && sorted.length >= 2) {
    const first = getMonthName(sorted[0], language);
    const last = getMonthName(sorted[sorted.length - 1], language);
    return intl.formatMessage({ id: 'details.vigilancePeriodFromTo' }, { start: first, end: last });
  }

  const monthNames = sorted.map(m => getMonthName(m, language));
  return monthNames.join(', ');
};

export const formatActiveDays = (days: (number | string)[], language: string): string => {
  if (!days || days.length === 0) return '';
  const sorted = [...days].map(Number).sort((a, b) => a - b);
  const dayNames = sorted.map(d => getDayName(d, language));
  return dayNames.join(', ');
};

export const formatVigilancePeriod = ({
  startDate,
  endDate,
  activeDays = [],
  activeMonths = [],
  intl,
  isHeader = false,
}: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  activeDays?: (number | string)[];
  activeMonths?: (number | string)[];
  intl: IntlShape;
  isHeader?: boolean;
}): string | null => {
  const language = intl.locale || 'fr';
  const hasStart = Boolean(startDate);
  const hasEnd = Boolean(endDate);
  const hasMonths = activeMonths && activeMonths.length > 0;
  const hasDays = activeDays && activeDays.length > 0;

  const formattedStart = startDate
    ? new Date(startDate).toLocaleDateString(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const formattedEnd = endDate
    ? new Date(endDate).toLocaleDateString(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const monthsStr = formatActiveMonths(activeMonths, intl, language);
  const daysStr = formatActiveDays(activeDays, language);

  // Case 1: Start date present, NO end date, NO active months or days
  if (hasStart && !hasEnd && !hasMonths && !hasDays) {
    return intl.formatMessage(
      { id: 'details.vigilancePeriodFromNoEnd' },
      { startDate: formattedStart },
    );
  }

  // Case 2: NO end date (or no dates at all), BUT active months and/or days present
  if (!hasEnd && (hasMonths || hasDays)) {
    if (isHeader) {
      if (hasMonths) return monthsStr;
      if (hasDays) {
        return intl.formatMessage({ id: 'details.vigilancePeriodDays' }, { days: daysStr });
      }
    } else {
      if (hasMonths && hasDays) {
        return intl.formatMessage(
          { id: 'details.vigilancePeriodMonthsAndDays' },
          { months: monthsStr, days: daysStr },
        );
      }
      if (hasMonths) {
        return monthsStr;
      }
      if (hasDays) {
        return intl.formatMessage({ id: 'details.vigilancePeriodDays' }, { days: daysStr });
      }
    }
  }

  // Case 3: Start date AND end date present
  if (hasStart && hasEnd) {
    if (hasDays && !isHeader) {
      return intl.formatMessage(
        { id: 'details.vigilancePeriodRangeWithDays' },
        { startDate: formattedStart, endDate: formattedEnd, days: daysStr },
      );
    }
    return intl.formatMessage(
      { id: 'details.vigilancePeriodRange' },
      { startDate: formattedStart, endDate: formattedEnd },
    );
  }

  // Case 4: Only start date without end date
  if (hasStart && !hasEnd) {
    return intl.formatMessage(
      { id: 'details.vigilancePeriodFromNoEnd' },
      { startDate: formattedStart },
    );
  }

  // Case 5: Only end date
  if (!hasStart && hasEnd) {
    return intl.formatMessage(
      { id: 'details.vigilancePeriodUntil' },
      { endDate: formattedEnd },
    );
  }

  return null;
};
