import { IntlShape } from 'react-intl';
import {
  formatSinglePeriod,
  formatVigilancePeriod,
  getImpracticableEndDate,
  isVigilanceAreaActive,
  sortVigilanceAreas,
} from '../utils';

describe('isVigilanceAreaActive', () => {
  it('returns true when area has no date or day restrictions', () => {
    const vigilanceArea = {
      id: '1',
      name: 'Zone Test',
      practicability: 'closed',
      activeDays: [],
    };
    expect(isVigilanceAreaActive(vigilanceArea)).toBe(true);
  });

  it('returns false if current date is before startDate', () => {
    const vigilanceArea = {
      periods: [
        {
          startDate: '2026-09-01',
          endDate: '2026-09-30',
        },
      ],
    };
    const testDate = new Date('2026-08-15');
    expect(isVigilanceAreaActive(vigilanceArea, testDate)).toBe(false);
  });

  it('returns false if current date is after endDate', () => {
    const vigilanceArea = {
      periods: [
        {
          startDate: '2026-01-01',
          endDate: '2026-05-01',
        },
      ],
    };
    const testDate = new Date('2026-08-15');
    expect(isVigilanceAreaActive(vigilanceArea, testDate)).toBe(false);
  });

  it('returns true if current date is within startDate and endDate range', () => {
    const vigilanceArea = {
      periods: [
        {
          startDate: '2026-08-01',
          endDate: '2026-08-31',
        },
      ],
    };
    const testDate = new Date('2026-08-15');
    expect(isVigilanceAreaActive(vigilanceArea, testDate)).toBe(true);
  });

  it('checks activeDays correctly with 0-based indexing (0=Monday)', () => {
    const vigilanceArea = {
      periods: [
        {
          activeDays: [0, 1, 2, 3, 4], // Monday (0) to Friday (4)
        },
      ],
    };
    // 2026-08-31 is a Monday (Geotrek day 0)
    const mondayDate = new Date('2026-08-31');
    // 2026-08-30 is a Sunday (Geotrek day 6)
    const sundayDate = new Date('2026-08-30');

    expect(isVigilanceAreaActive(vigilanceArea, mondayDate)).toBe(true);
    expect(isVigilanceAreaActive(vigilanceArea, sundayDate)).toBe(false);
  });

  it('evaluates periods array with annual flag correctly', () => {
    const vigilanceArea = {
      periods: [
        {
          startDate: '2020-07-01',
          endDate: '2020-08-31',
          activeDays: [],
          annual: true,
        },
      ],
    };
    const testDateSummer = new Date('2026-07-15');
    const testDateWinter = new Date('2026-12-15');

    expect(isVigilanceAreaActive(vigilanceArea, testDateSummer)).toBe(true);
    expect(isVigilanceAreaActive(vigilanceArea, testDateWinter)).toBe(false);
  });
});

describe('formatVigilancePeriod rules', () => {
  const mockIntl = {
    locale: 'fr',
    formatMessage: (
      { id, defaultMessage }: { id: string; defaultMessage?: string },
      values?: Record<string, unknown>,
    ) => {
      if (id === 'details.vigilancePeriodAllYear') return "Toute l'année";
      if (id === 'details.vigilancePeriodFromNoEnd')
        return `À partir du ${String(values?.startDate ?? '')} et jusqu’à nouvel ordre`;
      if (id === 'details.vigilancePeriodFromTo')
        return `De ${String(values?.start ?? '')} à ${String(values?.end ?? '')}`;
      if (id === 'details.vigilancePeriodDays')
        return `Aux jours suivants : ${String(values?.days ?? '')}`;
      if (id === 'details.vigilancePeriodDaysRange')
        return `du ${String(values?.start ?? '')} au ${String(values?.end ?? '')}`;
      if (id === 'details.vigilancePeriodDaysRangeAllYear')
        return `Toute l'année, ${String(values?.start ?? '')}`;
      if (id === 'details.vigilancePeriodRange')
        return `Du ${String(values?.startDate ?? '')} au ${String(values?.endDate ?? '')}`;
      if (id === 'details.vigilancePeriodRangeWithDays')
        return `Du ${String(values?.startDate ?? '')} au ${String(values?.endDate ?? '')}, les ${String(values?.days ?? '')}`;
      if (id === 'details.vigilancePeriodUntil')
        return `Jusqu’au ${String(values?.endDate ?? '')}`;
      if (id === 'details.vigilanceMultiplePeriods')
        return "Plusieurs périodes concernées au cours de l'année, consulter le détail pour plus de précisions";
      if (id === 'details.vigilanceAnnual')
        return `Chaque année : ${String(values?.period ?? '')}`;
      return defaultMessage || id;
    },
  } as unknown as IntlShape;

  it('Rule 1: Jan 1 startDate and no endDate -> Toute l\'année', () => {
    const formattedResult = formatVigilancePeriod({
      periods: [
        {
          startDate: '2026-01-01',
          endDate: null,
          activeDays: [],
          annual: false,
        },
      ],
      intl: mockIntl,
    });
    expect(formattedResult).toBe("Toute l'année");
  });

  it('Rule 2: startDate not Jan 1 and no endDate -> À partir du [date] et jusqu\'à nouvel ordre', () => {
    const formattedResult = formatVigilancePeriod({
      periods: [
        {
          startDate: '2026-08-12',
          endDate: null,
          activeDays: [],
          annual: false,
        },
      ],
      intl: mockIntl,
    });
    expect(formattedResult).toBe('À partir du 12 août 2026 et jusqu’à nouvel ordre');
  });

  it('Rule 3: Continuous days range [0..4] without endDate -> Toute l\'année, du lundi au vendredi', () => {
    const formattedResult = formatVigilancePeriod({
      periods: [
        {
          startDate: '2026-01-01',
          endDate: null,
          activeDays: [0, 1, 2, 3, 4],
          annual: false,
        },
      ],
      intl: mockIntl,
    });
    expect(formattedResult).toBe("Toute l'année, du lundi au vendredi");
  });

  it('Rule 4: Non-continuous days [2, 5, 6] without endDate -> Aux jours suivants : mercredi, samedi, dimanche', () => {
    const formattedResult = formatVigilancePeriod({
      periods: [
        {
          startDate: '2026-01-01',
          endDate: null,
          activeDays: [2, 5, 6],
          annual: false,
        },
      ],
      intl: mockIntl,
    });
    expect(formattedResult).toBe('Aux jours suivants : mercredi, samedi, dimanche');
  });

  it('Rule 5: Multiple periods in header displays summary text', () => {
    const formattedResult = formatVigilancePeriod({
      periods: [
        { startDate: '2026-06-01', endDate: '2026-07-01', activeDays: [], annual: false },
        { startDate: '2026-09-01', endDate: '2026-10-01', activeDays: [], annual: false },
      ],
      intl: mockIntl,
      isHeader: true,
    });
    expect(formattedResult).toBe(
      "Plusieurs périodes concernées au cours de l'année, consulter le détail pour plus de précisions",
    );
  });

  it('Rule 6: Annual period formats with Chaque année prefix and no year in date', () => {
    const formattedResult = formatSinglePeriod({
      startDate: '2026-06-01',
      endDate: '2026-09-30',
      activeDays: [],
      annual: true,
      intl: mockIntl,
    });
    expect(formattedResult).toBe('Chaque année : Du 1 juin au 30 septembre');
  });

  it('Rule 7: startDate and endDate with activeDays -> Du [startDate] au [endDate], les [jours]', () => {
    const formattedResult = formatVigilancePeriod({
      periods: [
        {
          startDate: '2026-08-29',
          endDate: '2026-10-30',
          activeDays: [0, 1, 2, 3, 4],
          annual: false,
        },
      ],
      intl: mockIntl,
    });
    expect(formattedResult).toBe(
      'Du 29 août 2026 au 30 octobre 2026, les lundi, mardi, mercredi, jeudi, vendredi',
    );
  });
});

describe('sortVigilanceAreas', () => {
  const referenceDate = new Date('2026-08-15');

  it('sorts by severity first: impracticable before alert before vigilance before info', () => {
    const vigilanceAreas = [
      { id: 'info', criticality: 'info', isImpracticable: false },
      { id: 'impracticable', isImpracticable: true },
      { id: 'alert', criticality: 'alert', isImpracticable: false },
      { id: 'vigilance', criticality: 'vigilance', isImpracticable: false },
    ];

    const sortedAreas = sortVigilanceAreas(vigilanceAreas, referenceDate);
    const sortedIds = sortedAreas.map(vigilanceArea => vigilanceArea.id);
    expect(sortedIds).toEqual(['impracticable', 'alert', 'vigilance', 'info']);
  });

  it('sorts chronologically when severity is the same: active today first, then closest future, then past', () => {
    const vigilanceAreas = [
      {
        id: 'past',
        isImpracticable: false,
        periods: [
          {
            startDate: '2026-05-01',
            endDate: '2026-06-01',
          },
        ],
      },
      {
        id: 'active-today',
        isImpracticable: false,
        periods: [
          {
            startDate: '2026-08-01',
            endDate: '2026-08-31',
          },
        ],
      },
      {
        id: 'future-near',
        isImpracticable: false,
        periods: [
          {
            startDate: '2026-09-01',
            endDate: '2026-09-30',
          },
        ],
      },
      {
        id: 'future-far',
        isImpracticable: false,
        periods: [
          {
            startDate: '2026-11-01',
            endDate: '2026-11-30',
          },
        ],
      },
    ];

    const sortedAreas = sortVigilanceAreas(vigilanceAreas, referenceDate);
    const sortedIds = sortedAreas.map(vigilanceArea => vigilanceArea.id);
    expect(sortedIds).toEqual(['active-today', 'future-near', 'future-far', 'past']);
  });
});

describe('getImpracticableEndDate', () => {
  const targetDate = new Date('2026-10-22T12:00:00');

  it('returns null when publishedAreaIds is empty or vigilanceAreasMap has no matching areas', () => {
    expect(getImpracticableEndDate([], {}, targetDate)).toBeNull();
    expect(getImpracticableEndDate([1], {}, targetDate)).toBeNull();
  });

  it('returns null when matching areas are not impracticable', () => {
    const vigilanceAreasMap = {
      1: {
        id: 1,
        impracticable: false,
        periods: [{ startDate: '2026-06-01', endDate: '2026-11-18', activeDays: [], annual: false }],
      },
    };
    expect(getImpracticableEndDate([1], vigilanceAreasMap, targetDate)).toBeNull();
  });

  it('returns null when an active impracticable area has no periods (indefinite)', () => {
    const vigilanceAreasMap = {
      1: {
        id: 1,
        impracticable: true,
        periods: [],
      },
    };
    expect(getImpracticableEndDate([1], vigilanceAreasMap, targetDate)).toBeNull();
  });

  it('returns the end date for Trek 1 scenario (period active at targetDate ending 2026-11-18)', () => {
    const vigilanceAreasMap = {
      1: {
        id: 1,
        impracticable: false,
        periods: [],
      },
      2: {
        id: 2,
        impracticable: true,
        periods: [
          {
            id: 201,
            startDate: '2026-06-01',
            endDate: '2026-11-18',
            activeDays: [],
            annual: false,
          },
        ],
      },
    };
    const endDate = getImpracticableEndDate([1, 2], vigilanceAreasMap, targetDate);
    expect(endDate).toBe('2026-11-18');
  });

  it('retains the explicit end date when an impracticable area with endDate is combined with an indefinite impracticable area (Trek 1 case)', () => {
    const vigilanceAreasMap = {
      1: {
        id: 1,
        impracticable: true,
        periods: [], // indefinite
      },
      2: {
        id: 2,
        impracticable: true,
        periods: [
          {
            startDate: '2026-06-01',
            endDate: '2026-11-18',
            activeDays: [],
            annual: false,
          },
        ],
      },
    };
    expect(getImpracticableEndDate([1, 2], vigilanceAreasMap, targetDate)).toBe('2026-11-18');
  });

  it('returns the maximum end date when multiple active impracticable areas have end dates', () => {
    const vigilanceAreasMap = {
      1: {
        id: 1,
        impracticable: true,
        periods: [
          {
            startDate: '2026-06-01',
            endDate: '2026-11-18',
            activeDays: [],
            annual: false,
          },
        ],
      },
      2: {
        id: 2,
        impracticable: true,
        periods: [
          {
            startDate: '2026-07-01',
            endDate: '2026-12-15',
            activeDays: [],
            annual: false,
          },
        ],
      },
    };
    expect(getImpracticableEndDate([1, 2], vigilanceAreasMap, targetDate)).toBe('2026-12-15');
  });

  it('correctly handles annual period endDate calculation', () => {
    const vigilanceAreasMap = {
      1: {
        id: 1,
        impracticable: true,
        periods: [
          {
            startDate: '2026-06-01',
            endDate: '2026-11-20',
            activeDays: [],
            annual: true,
          },
        ],
      },
    };
    expect(getImpracticableEndDate([1], vigilanceAreasMap, targetDate)).toBe('2026-11-20');
  });
});
