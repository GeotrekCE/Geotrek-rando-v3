import { IntlShape } from 'react-intl';
import { VigilanceArea, VigilancePeriod } from './interface';

export const isDayActive = (
  activeDays: (number | string)[],
  targetDate: Date = new Date(),
): boolean => {
  if (!activeDays || activeDays.length === 0) return true;
  const dayOfWeek = targetDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const geotrekDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 0 = Mon, ..., 6 = Sun
  const isoDay = dayOfWeek === 0 ? 7 : dayOfWeek; // 1 = Mon, ..., 7 = Sun
  const activeNums = activeDays.map(Number);
  return activeNums.includes(geotrekDay) || activeNums.includes(isoDay);
};

export const isPeriodActive = (
  period: {
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    activeDays?: (number | string)[];
    annual?: boolean;
  },
  targetDate: Date = new Date(),
): boolean => {
  if (period.activeDays && period.activeDays.length > 0) {
    if (!isDayActive(period.activeDays, targetDate)) {
      return false;
    }
  }

  const targetIso = targetDate.toISOString().split('T')[0];
  const targetMonthDay = targetIso.slice(5);

  if (period.annual) {
    if (period.startDate && period.endDate) {
      const startMonthDay = String(period.startDate).slice(5, 10);
      const endMonthDay = String(period.endDate).slice(5, 10);
      if (startMonthDay <= endMonthDay) {
        return targetMonthDay >= startMonthDay && targetMonthDay <= endMonthDay;
      }
      return targetMonthDay >= startMonthDay || targetMonthDay <= endMonthDay;
    }
    if (period.startDate) {
      const startMonthDay = String(period.startDate).slice(5, 10);
      return targetMonthDay >= startMonthDay;
    }
    if (period.endDate) {
      const endMonthDay = String(period.endDate).slice(5, 10);
      return targetMonthDay <= endMonthDay;
    }
    return true;
  }

  if (period.startDate) {
    const startIso = new Date(period.startDate).toISOString().split('T')[0];
    if (targetIso < startIso) return false;
  }
  if (period.endDate) {
    const endIso = new Date(period.endDate).toISOString().split('T')[0];
    if (targetIso > endIso) return false;
  }

  return true;
};

export const isVigilanceAreaActive = (
  area: VigilanceArea | Record<string, unknown>,
  targetDate: Date = new Date(),
): boolean => {
  const rawArea = area as Record<string, unknown>;
  const periods = (rawArea.periods as VigilancePeriod[] | undefined) || [];
  if (periods.length === 0) return true;
  return periods.some(vigilancePeriod => isPeriodActive(vigilancePeriod, targetDate));
};

export const isJanFirstDate = (dateStr: string | Date | null | undefined): boolean => {
  if (!dateStr) return false;
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return false;
  return dateObj.getMonth() === 0 && dateObj.getDate() === 1;
};

export const getDayName = (dayNum: number, language: string): string => {
  const normDay = dayNum === 7 ? 6 : dayNum;
  const date = new Date(2026, 0, 5 + normDay);
  return date.toLocaleDateString(language, { weekday: 'long' });
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
  const dayNames = sorted.map(dayNum => getDayName(dayNum, language));
  const rawList = dayNames.join(', ');

  const isConsecutive =
    sorted.length > 1 && sorted.every((dayNum, dayIndex) => dayIndex === 0 || dayNum === sorted[dayIndex - 1] + 1);

  if (isConsecutive && sorted.length >= 2) {
    const firstDay = getDayName(sorted[0], language);
    const lastDay = getDayName(sorted[sorted.length - 1], language);
    const rangeText = intl.formatMessage(
      { id: 'details.vigilancePeriodDaysRange', defaultMessage: 'du {start} au {end}' },
      { start: firstDay, end: lastDay },
    );
    return { text: rangeText, rawList, isRange: true };
  }

  return { text: rawList, rawList, isRange: false };
};

export const formatSinglePeriod = ({
  startDate,
  endDate,
  activeDays = [],
  annual = false,
  intl,
}: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  activeDays?: (number | string)[];
  annual?: boolean;
  intl: IntlShape;
}): string | null => {
  const language = intl.locale || 'fr';
  const hasStart = Boolean(startDate);
  const hasEnd = Boolean(endDate);
  const hasDays = activeDays && activeDays.length > 0;

  const dateOptions: Intl.DateTimeFormatOptions = annual
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric', month: 'long', year: 'numeric' };

  const formattedStart = startDate
    ? new Date(startDate).toLocaleDateString(language, dateOptions)
    : '';

  const formattedEnd = endDate
    ? new Date(endDate).toLocaleDateString(language, dateOptions)
    : '';

  const daysInfo = formatActiveDaysInfo(activeDays, language, intl);

  let periodText = '';

  if (!hasEnd) {
    if (!hasDays) {
      if (hasStart) {
        if (!annual && isJanFirstDate(startDate)) {
          periodText = intl.formatMessage({
            id: 'details.vigilancePeriodAllYear',
            defaultMessage: "Toute l'année",
          });
        } else {
          periodText = intl.formatMessage(
            {
              id: 'details.vigilancePeriodFromNoEnd',
              defaultMessage: 'À partir du {startDate} et jusqu’à nouvel ordre',
            },
            { startDate: formattedStart },
          );
        }
      } else {
        periodText = intl.formatMessage({
          id: 'details.vigilancePeriodAllYear',
          defaultMessage: "Toute l'année",
        });
      }
    } else {
      if (daysInfo.isRange) {
        if (!hasStart || (!annual && isJanFirstDate(startDate))) {
          periodText = intl.formatMessage(
            { id: 'details.vigilancePeriodDaysRangeAllYear', defaultMessage: "Toute l'année, {start}" },
            { start: daysInfo.text },
          );
        } else {
          periodText = intl.formatMessage(
            {
              id: 'details.vigilancePeriodFromNoEnd',
              defaultMessage: 'À partir du {startDate} et jusqu’à nouvel ordre',
            },
            { startDate: `${formattedStart} (${daysInfo.text})` },
          );
        }
      } else {
        const daysFormatted = intl.formatMessage(
          { id: 'details.vigilancePeriodDays', defaultMessage: 'Aux jours suivants : {days}' },
          { days: daysInfo.text },
        );
        if (!hasStart || (!annual && isJanFirstDate(startDate))) {
          periodText = daysFormatted;
        } else {
          periodText = intl.formatMessage(
            {
              id: 'details.vigilancePeriodFromNoEnd',
              defaultMessage: 'À partir du {startDate} et jusqu’à nouvel ordre',
            },
            { startDate: `${formattedStart} (${daysFormatted})` },
          );
        }
      }
    }
  } else if (hasStart && hasEnd) {
    if (hasDays) {
      periodText = intl.formatMessage(
        {
          id: 'details.vigilancePeriodRangeWithDays',
          defaultMessage: 'Du {startDate} au {endDate}, les {days}',
        },
        { startDate: formattedStart, endDate: formattedEnd, days: daysInfo.rawList },
      );
    } else {
      periodText = intl.formatMessage(
        { id: 'details.vigilancePeriodRange', defaultMessage: 'Du {startDate} au {endDate}' },
        { startDate: formattedStart, endDate: formattedEnd },
      );
    }
  } else if (!hasStart && hasEnd) {
    periodText = intl.formatMessage(
      { id: 'details.vigilancePeriodUntil', defaultMessage: 'Jusqu’au {endDate}' },
      { endDate: formattedEnd },
    );
  }

  if (!periodText) return null;

  if (annual) {
    return intl.formatMessage(
      { id: 'details.vigilanceAnnual', defaultMessage: 'Chaque année : {period}' },
      { period: periodText },
    );
  }

  return periodText;
};

export interface FormatVigilancePeriodParams {
  periods?: VigilancePeriod[];
  intl: IntlShape;
  isHeader?: boolean;
}

export const formatVigilancePeriod = ({
  periods = [],
  intl,
  isHeader = false,
}: FormatVigilancePeriodParams): string | null => {
  if (periods.length === 0) {
    return intl.formatMessage({
      id: 'details.vigilancePeriodAllYear',
      defaultMessage: "Toute l'année",
    });
  }

  if (isHeader && periods.length > 1) {
    return intl.formatMessage({
      id: 'details.vigilanceMultiplePeriods',
      defaultMessage:
        "Plusieurs périodes concernées au cours de l'année, consulter le détail pour plus de précisions",
    });
  }

  if (periods.length === 1) {
    const singlePeriod = periods[0];
    return formatSinglePeriod({
      startDate: singlePeriod.startDate,
      endDate: singlePeriod.endDate,
      activeDays: singlePeriod.activeDays,
      annual: Boolean(singlePeriod.annual),
      intl,
    });
  }

  return intl.formatMessage({
    id: 'details.vigilanceMultiplePeriods',
    defaultMessage:
      "Plusieurs périodes concernées au cours de l'année, consulter le détail pour plus de précisions",
  });
};

export const getVigilanceSeverityRank = (area: Record<string, any>): number => {
  if (area.isImpracticable === true || area.impracticable === true) return 0;

  const levelNum =
    typeof area.level === 'object' && area.level !== null
      ? area.level.level
      : typeof area.level === 'number' || typeof area.level === 'string'
      ? Number(area.level)
      : null;

  if (levelNum === 1 || area.criticality === 'alert' || area.criticality === 'high') {
    return 1;
  }
  if (levelNum === 2 || area.criticality === 'vigilance') {
    return 2;
  }
  if (levelNum === 3 || area.criticality === 'info') {
    return 3;
  }

  return 4;
};

export const getChronologicalScore = (
  area: Record<string, any>,
  referenceDate: Date = new Date(),
): number => {
  const todayTime = referenceDate.getTime();
  const periods: VigilancePeriod[] = area.periods || [];

  if (periods.length === 0) return 0.5;

  let bestScore = Infinity;

  for (const period of periods) {
    const rawStart = period.startDate;
    const rawEnd = period.endDate;
    const isAnnual = Boolean(period.annual);

    if (!rawStart && !rawEnd) {
      bestScore = Math.min(bestScore, 0.5);
      continue;
    }

    const currentYear = referenceDate.getFullYear();
    let startTime: number | null = null;
    let endTime: number | null = null;

    if (rawStart) {
      if (isAnnual) {
        const monthDay = String(rawStart).slice(5, 10);
        startTime = new Date(`${currentYear}-${monthDay}`).getTime();
      } else {
        startTime = new Date(rawStart).getTime();
      }
    }

    if (rawEnd) {
      if (isAnnual) {
        const monthDay = String(rawEnd).slice(5, 10);
        endTime = new Date(`${currentYear}-${monthDay}`).getTime();
      } else {
        endTime = new Date(rawEnd).getTime();
      }
    }

    if (isAnnual && startTime !== null && endTime !== null && startTime > endTime) {
      if (todayTime >= startTime) {
        endTime = new Date(`${currentYear + 1}-${String(rawEnd).slice(5, 10)}`).getTime();
      } else {
        startTime = new Date(`${currentYear - 1}-${String(rawStart).slice(5, 10)}`).getTime();
      }
    }

    const isAfterStart = startTime === null || todayTime >= startTime;
    const isBeforeEnd = endTime === null || todayTime <= endTime;

    if (isAfterStart && isBeforeEnd) {
      bestScore = Math.min(bestScore, 0);
    } else if (startTime !== null && startTime > todayTime) {
      const futureDiff = startTime - todayTime;
      bestScore = Math.min(bestScore, futureDiff);
    } else if (endTime !== null && endTime < todayTime) {
      const pastDiff = 1e14 + (todayTime - endTime);
      bestScore = Math.min(bestScore, pastDiff);
    }
  }

  return bestScore === Infinity ? 0.5 : bestScore;
};

export const sortVigilanceAreas = <T extends Record<string, any>>(
  vigilanceAreas: T[] = [],
  referenceDate: Date = new Date(),
): T[] => {
  return [...vigilanceAreas].sort((firstArea, secondArea) => {
    const severityDiff =
      getVigilanceSeverityRank(firstArea) - getVigilanceSeverityRank(secondArea);
    if (severityDiff !== 0) return severityDiff;

    const chronoDiff =
      getChronologicalScore(firstArea, referenceDate) -
      getChronologicalScore(secondArea, referenceDate);
    return chronoDiff;
  });
};
