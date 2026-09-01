import { isVigilanceAreaActive, isVigilancePeriodOngoing } from '../utils';

describe('isVigilanceAreaActive', () => {
  it('returns true when area has no date or day/month restrictions', () => {
    const area = {
      id: '1',
      name: 'Zone Test',
      practicability: 'closed',
      activeDays: [],
      activeMonths: [],
    };
    expect(isVigilanceAreaActive(area as any)).toBe(true);
  });

  it('respects explicit isActive property if present', () => {
    expect(isVigilanceAreaActive({ isActive: false } as any)).toBe(false);
    expect(isVigilanceAreaActive({ is_active: true } as any)).toBe(true);
  });

  it('returns false if current date is before startDate', () => {
    const area = {
      startDate: '2026-09-01',
      endDate: '2026-09-30',
    };
    const testDate = new Date('2026-08-15');
    expect(isVigilanceAreaActive(area as any, testDate)).toBe(false);
  });

  it('returns false if current date is after endDate', () => {
    const area = {
      startDate: '2026-01-01',
      endDate: '2026-05-01',
    };
    const testDate = new Date('2026-08-15');
    expect(isVigilanceAreaActive(area as any, testDate)).toBe(false);
  });

  it('returns true if current date is within startDate and endDate range', () => {
    const area = {
      startDate: '2026-08-01',
      endDate: '2026-08-31',
    };
    const testDate = new Date('2026-08-15');
    expect(isVigilanceAreaActive(area as any, testDate)).toBe(true);
  });

  it('checks activeMonths correctly', () => {
    const area = {
      activeMonths: [6, 7, 8], // June, July, August
    };
    const augustDate = new Date('2026-08-15');
    const septemberDate = new Date('2026-09-01');

    expect(isVigilanceAreaActive(area as any, augustDate)).toBe(true);
    expect(isVigilanceAreaActive(area as any, septemberDate)).toBe(false);
  });

  it('checks activeDays correctly with 0-based indexing (0=Monday)', () => {
    const area = {
      activeDays: [0, 1, 2, 3, 4], // Monday (0) to Friday (4)
    };
    // 2026-08-31 is a Monday (Geotrek day 0)
    const mondayDate = new Date('2026-08-31');
    // 2026-08-30 is a Sunday (Geotrek day 6)
    const sundayDate = new Date('2026-08-30');

    expect(isVigilanceAreaActive(area as any, mondayDate)).toBe(true);
    expect(isVigilanceAreaActive(area as any, sundayDate)).toBe(false);
  });
});

describe('getDayName & formatActiveDays', () => {
  it('formats activeDays [0, 1, 2, 3, 4] as Monday to Friday in French', () => {
    const { formatActiveDays } = require('../utils');
    const formatted = formatActiveDays([0, 1, 2, 3, 4], 'fr');
    expect(formatted).toBe('lundi, mardi, mercredi, jeudi, vendredi');
  });

  it('formats activeDays [2, 5, 6] as Wednesday, Saturday, Sunday in French', () => {
    const { formatActiveDays } = require('../utils');
    const formatted = formatActiveDays([2, 5, 6], 'fr');
    expect(formatted).toBe('mercredi, samedi, dimanche');
  });
});

describe('formatVigilancePeriod rules', () => {
  const mockIntl = {
    locale: 'fr',
    formatMessage: ({ id, defaultMessage }: { id: string; defaultMessage?: string }, values?: any) => {
      if (id === 'details.vigilancePeriodAllYear') return "Toute l'année";
      if (id === 'details.vigilancePeriodFromNoEnd') return `À partir du ${values?.startDate} et jusqu’à nouvel ordre`;
      if (id === 'details.vigilancePeriodFromTo') return `De ${values?.start} à ${values?.end}`;
      if (id === 'details.vigilancePeriodMonthsList') return `Aux mois de : ${values?.months}`;
      if (id === 'details.vigilancePeriodDays') return `Aux jours suivants : ${values?.days}`;
      if (id === 'details.vigilancePeriodDaysRange') return `du ${values?.start} au ${values?.end}`;
      if (id === 'details.vigilancePeriodDaysRangeAllYear') return `Toute l'année, ${values?.start}`;
      if (id === 'details.vigilancePeriodMonthsAndDays') return `${values?.months}, aux jours suivants : ${values?.days}`;
      if (id === 'details.vigilancePeriodRange') return `Du ${values?.startDate} au ${values?.endDate}`;
      if (id === 'details.vigilancePeriodRangeWithDays') return `Du ${values?.startDate} au ${values?.endDate}, les ${values?.days}`;
      if (id === 'details.vigilancePeriodUntil') return `Jusqu’au ${values?.endDate}`;
      return defaultMessage || id;
    },
  } as any;

  const { formatVigilancePeriod } = require('../utils');

  it('Rule 1: Jan 1 startDate and no endDate -> Toute l\'année', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-01-01',
      endDate: null,
      activeDays: [],
      activeMonths: [],
      intl: mockIntl,
    });
    expect(res).toBe("Toute l'année");
  });

  it('Rule 2: startDate not Jan 1 and no endDate -> À partir du [date] et jusqu\'à nouvel ordre', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-08-12',
      endDate: null,
      activeDays: [],
      activeMonths: [],
      intl: mockIntl,
    });
    expect(res).toBe("À partir du 12 août 2026 et jusqu’à nouvel ordre");
  });

  it('Rule 3: Continuous days range [0..4] without endDate -> Toute l\'année, du lundi au vendredi', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-01-01',
      endDate: null,
      activeDays: [0, 1, 2, 3, 4],
      activeMonths: [],
      intl: mockIntl,
    });
    expect(res).toBe("Toute l'année, du lundi au vendredi");
  });

  it('Rule 4: Non-continuous days [2, 5, 6] without endDate -> Aux jours suivants : mercredi, samedi, dimanche', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-01-01',
      endDate: null,
      activeDays: [2, 5, 6],
      activeMonths: [],
      intl: mockIntl,
    });
    expect(res).toBe("Aux jours suivants : mercredi, samedi, dimanche");
  });

  it('Rule 5: Consecutive months [8..12] without endDate -> De août à décembre', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-01-01',
      endDate: null,
      activeDays: [],
      activeMonths: [8, 9, 10, 11, 12],
      intl: mockIntl,
    });
    expect(res).toBe("De août à décembre");
  });

  it('Rule 6: Non-consecutive months [5, 6, 8, 9] without endDate -> Aux mois de : mai, juin, août, septembre', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-01-01',
      endDate: null,
      activeDays: [],
      activeMonths: [5, 6, 8, 9],
      intl: mockIntl,
    });
    expect(res).toBe("Aux mois de : mai, juin, août, septembre");
  });

  it('Rule 7: startDate and endDate with activeDays -> Du [startDate] au [endDate], les [jours]', () => {
    const res = formatVigilancePeriod({
      startDate: '2026-08-29',
      endDate: '2026-10-30',
      activeDays: [0, 1, 2, 3, 4],
      activeMonths: [],
      intl: mockIntl,
    });
    expect(res).toBe("Du 29 août 2026 au 30 octobre 2026, les lundi, mardi, mercredi, jeudi, vendredi");
  });
});
