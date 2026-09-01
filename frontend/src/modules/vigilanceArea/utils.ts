import { IntlShape } from 'react-intl';
import { VigilanceArea } from './interface';

export const isVigilanceAreaActive = (
  area: VigilanceArea | Record<string, unknown>,
  targetDate: Date = new Date(),
): boolean => {
  const rawArea = area as Record<string, unknown>;

  if (typeof rawArea.isActive === 'boolean') return rawArea.isActive;
  if (typeof rawArea.is_active === 'boolean') return rawArea.is_active;

  const todayIso = targetDate.toISOString().split('T')[0];

  const startDateStr = (rawArea.startDate ?? rawArea.start_date) as string | null | undefined;
  const endDateStr = (rawArea.endDate ?? rawArea.end_date) as string | null | undefined;

  if (startDateStr) {
    const startIso = new Date(startDateStr).toISOString().split('T')[0];
    if (todayIso < startIso) return false;
  }

  if (endDateStr) {
    const endIso = new Date(endDateStr).toISOString().split('T')[0];
    if (todayIso > endIso) return false;
  }

  const activeMonths = (rawArea.activeMonths ?? rawArea.active_months) as (number | string)[] | undefined;
  if (activeMonths && activeMonths.length > 0) {
    const currentMonth = targetDate.getMonth() + 1;
    if (!activeMonths.map(Number).includes(currentMonth)) return false;
  }

  const activeDays = (rawArea.activeDays ?? rawArea.active_days) as (number | string)[] | undefined;
  if (activeDays && activeDays.length > 0) {
    const dayOfWeek = targetDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const geotrekDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0 = Mon, ..., 6 = Sun
    const isoDay = dayOfWeek === 0 ? 7 : dayOfWeek; // 1 = Mon, ..., 7 = Sun
    const activeNums = activeDays.map(Number);
    if (!activeNums.includes(geotrekDay) && !activeNums.includes(isoDay)) return false;
  }

  return true;
};

export const isVigilancePeriodOngoing = (
  area: VigilanceArea | Record<string, unknown>,
  targetDate: Date = new Date(),
): boolean => {
  const rawArea = area as Record<string, unknown>;

  if (typeof rawArea.isPeriodOngoing === 'boolean') return rawArea.isPeriodOngoing;
  if (typeof rawArea.is_period_ongoing === 'boolean') return rawArea.is_period_ongoing;
  if (typeof rawArea.is_ongoing === 'boolean') return rawArea.is_ongoing;

  const todayIso = targetDate.toISOString().split('T')[0];

  const startDateStr = (rawArea.startDate ?? rawArea.start_date) as string | null | undefined;
  const endDateStr = (rawArea.endDate ?? rawArea.end_date) as string | null | undefined;

  if (startDateStr) {
    const startIso = new Date(startDateStr).toISOString().split('T')[0];
    if (todayIso < startIso) return false;
  }

  if (endDateStr) {
    const endIso = new Date(endDateStr).toISOString().split('T')[0];
    if (todayIso > endIso) return false;
  }

  const activeMonths = (rawArea.activeMonths ?? rawArea.active_months) as (number | string)[] | undefined;
  if (activeMonths && activeMonths.length > 0) {
    const currentMonth = targetDate.getMonth() + 1;
    if (!activeMonths.map(Number).includes(currentMonth)) return false;
  }

  return true;
};

export const isJanFirstDate = (dateStr: string | Date | null | undefined): boolean => {
  if (!dateStr) return false;
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return false;
  return dateObj.getMonth() === 0 && dateObj.getDate() === 1;
};

export const getMonthName = (monthNum: number, language: string): string => {
  const date = new Date(2026, monthNum - 1, 1);
  return date.toLocaleDateString(language, { month: 'long' });
};

export const getDayName = (dayNum: number, language: string): string => {
  // Geotrek-admin API uses 0-indexed days: 0 = Monday, ..., 6 = Sunday (or 7 = Sunday)
  const normDay = dayNum === 7 ? 6 : dayNum;
  // Jan 5, 2026 is a Monday
  const date = new Date(2026, 0, 5 + normDay);
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
  return intl.formatMessage(
    { id: 'details.vigilancePeriodMonthsList', defaultMessage: 'Aux mois de : {months}' },
    { months: monthNames.join(', ') },
  );
};

export interface FormattedActiveDays {
  text: string;
  rawList: string;
  isRange: boolean;
}

export const formatActiveDaysInfo = (
  days: (number | string)[],
  language: string,
  intl: IntlShape,
): FormattedActiveDays => {
  if (!days || days.length === 0) return { text: '', rawList: '', isRange: false };
  const sorted = [...days].map(Number).sort((a, b) => a - b);
  const dayNames = sorted.map(d => getDayName(d, language));
  const rawList = dayNames.join(', ');

  const isConsecutive =
    sorted.length > 1 && sorted.every((d, idx) => idx === 0 || d === sorted[idx - 1] + 1);

  if (isConsecutive && sorted.length >= 2) {
    const first = getDayName(sorted[0], language);
    const last = getDayName(sorted[sorted.length - 1], language);
    const rangeText = intl.formatMessage(
      { id: 'details.vigilancePeriodDaysRange', defaultMessage: 'du {start} au {end}' },
      { start: first, end: last },
    );
    return { text: rangeText, rawList, isRange: true };
  }

  return { text: rawList, rawList, isRange: false };
};

export const formatActiveDays = (
  days: (number | string)[],
  language: string,
  intl?: IntlShape,
): string => {
  if (!days || days.length === 0) return '';
  if (intl) {
    const info = formatActiveDaysInfo(days, language, intl);
    return info.text;
  }
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

  const isJanFirst = startDate ? isJanFirstDate(startDate) : false;

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
  const daysInfo = formatActiveDaysInfo(activeDays, language, intl);

  // Case A: NO END DATE (!hasEnd)
  if (!hasEnd) {
    // A.1: NO end date, NO active months, NO active days
    if (!hasMonths && !hasDays) {
      if (hasStart) {
        if (isJanFirst) {
          return intl.formatMessage({ id: 'details.vigilancePeriodAllYear', defaultMessage: "Toute l'année" });
        }
        return intl.formatMessage(
          { id: 'details.vigilancePeriodFromNoEnd' },
          { startDate: formattedStart },
        );
      }
      return intl.formatMessage({ id: 'details.vigilancePeriodAllYear', defaultMessage: "Toute l'année" });
    }

    // A.2: NO end date, ONLY activeDays (no activeMonths)
    if (!hasMonths && hasDays) {
      if (daysInfo.isRange) {
        if (!hasStart || isJanFirst) {
          return intl.formatMessage(
            { id: 'details.vigilancePeriodDaysRangeAllYear', defaultMessage: "Toute l'année, {start}" },
            { start: daysInfo.text },
          );
        }
        return intl.formatMessage(
          { id: 'details.vigilancePeriodFromNoEnd' },
          { startDate: `${formattedStart} (${daysInfo.text})` },
        );
      } else {
        const daysFormatted = intl.formatMessage({ id: 'details.vigilancePeriodDays' }, { days: daysInfo.text });
        if (!hasStart || isJanFirst) {
          return daysFormatted;
        }
        return intl.formatMessage(
          { id: 'details.vigilancePeriodFromNoEnd' },
          { startDate: `${formattedStart} (${daysFormatted})` },
        );
      }
    }

    // A.3: NO end date, ONLY activeMonths (no activeDays)
    if (hasMonths && !hasDays) {
      if (!hasStart || isJanFirst) {
        return monthsStr;
      }
      return intl.formatMessage(
        { id: 'details.vigilancePeriodFromNoEnd' },
        { startDate: `${formattedStart} (${monthsStr})` },
      );
    }

    // A.4: NO end date, BOTH activeMonths AND activeDays
    if (hasMonths && hasDays) {
      const daysText = daysInfo.isRange
        ? daysInfo.text
        : intl.formatMessage({ id: 'details.vigilancePeriodDays' }, { days: daysInfo.text });
      const monthsAndDays = intl.formatMessage(
        { id: 'details.vigilancePeriodMonthsAndDays' },
        { months: monthsStr, days: daysText },
      );
      if (!hasStart || isJanFirst) {
        return monthsAndDays;
      }
      return intl.formatMessage(
        { id: 'details.vigilancePeriodFromNoEnd' },
        { startDate: `${formattedStart} (${monthsAndDays})` },
      );
    }
  }

  // Case B: BOTH START DATE AND END DATE PRESENT
  if (hasStart && hasEnd) {
    if (hasDays) {
      return intl.formatMessage(
        { id: 'details.vigilancePeriodRangeWithDays' },
        { startDate: formattedStart, endDate: formattedEnd, days: daysInfo.rawList },
      );
    }
    return intl.formatMessage(
      { id: 'details.vigilancePeriodRange' },
      { startDate: formattedStart, endDate: formattedEnd },
    );
  }

  // Case C: ONLY END DATE (!hasStart && hasEnd)
  if (!hasStart && hasEnd) {
    return intl.formatMessage(
      { id: 'details.vigilancePeriodUntil' },
      { endDate: formattedEnd },
    );
  }

  return null;
};
