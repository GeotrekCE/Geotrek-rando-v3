import { adaptTrekResultList } from '../adapter';
import { RawTrekResult } from '../interface';

describe('results adapter', () => {
  it('should correctly adapt impracticable and published vigilance areas in adaptTrekResultList', () => {
    const rawTrekResults: Partial<RawTrekResult>[] = [
      {
        id: 36239,
        ascent: 500,
        descent: 500,
        departure: 'Valbonnais',
        difficulty: 2,
        duration: 3,
        themes: [1],
        departure_city: '38520',
        length_2d: 8500,
        name: 'Sentier du Lac',
        reservation_system: null,
        attachments: [],
        practice: 1,
        networks: [],
        route: null,
        impracticable: true,
        published_vigilance_areas: [101, 102],
      },
    ];

    const results = adaptTrekResultList({
      resultsList: rawTrekResults,
      difficulties: { 2: { label: 'Facile', pictogramUri: 'easy.svg' } },
      themes: { 1: { label: 'Faune et flore' } },
      activities: { 1: { id: 1, label: 'Pédestre', pictogramUri: 'walk.svg' } },
      cityDictionnary: { '38520': { id: '38520', name: 'Valbonnais', code: '38520' } },
      networks: {},
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('36239');
    expect(results[0].isImpracticable).toBe(true);
    expect(results[0].publishedVigilanceAreas).toEqual([101, 102]);
    expect(results[0].endDate).toBeNull();
  });

  it('should compute endDate when vigilanceAreasPeriods and targetDate are provided', () => {
    const rawTrekResults: Partial<RawTrekResult>[] = [
      {
        id: 36239,
        ascent: 500,
        descent: 500,
        departure: 'Valbonnais',
        difficulty: 2,
        duration: 3,
        themes: [1],
        departure_city: '38520',
        length_2d: 8500,
        name: 'Sentier du Lac',
        reservation_system: null,
        attachments: [],
        practice: 1,
        networks: [],
        route: null,
        impracticable: true,
        published_vigilance_areas: [101, 102],
      },
    ];

    const vigilanceAreasPeriods = {
      101: {
        id: 101,
        impracticable: false,
        periods: [],
      },
      102: {
        id: 102,
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

    const results = adaptTrekResultList({
      resultsList: rawTrekResults,
      difficulties: { 2: { label: 'Facile', pictogramUri: 'easy.svg' } },
      themes: { 1: { label: 'Faune et flore' } },
      activities: { 1: { id: 1, label: 'Pédestre', pictogramUri: 'walk.svg' } },
      cityDictionnary: { '38520': { id: '38520', name: 'Valbonnais', code: '38520' } },
      networks: {},
      vigilanceAreasPeriods,
      targetDate: new Date('2026-10-22T12:00:00'),
    });

    expect(results[0].endDate).toBe('2026-11-18');
  });
});
