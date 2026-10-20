import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { adaptTouristicContentDetails, adaptTouristicContentResult } from '../adapter';
import { RawTouristicContentDetails, RawTouristicContentResult } from '../interface';

describe('touristicContent adapter', () => {
  it('should correctly adapt closed status and vigilance areas in adaptTouristicContentDetails', () => {
    const rawTCD: RawTouristicContentDetails = {
      id: '8850',
      type: 'Feature',
      bbox: [6.0, 45.0, 6.1, 45.1],
      geometry: { type: 'Point', coordinates: [6.0, 45.0] },
      properties: {
        id: '8850',
        name: 'CT 2 Closed',
        category: 1,
        description: 'Test description',
        description_teaser: 'Teaser',
        accessibility: 'Accessible',
        practical_info: 'Practical info',
        source: [],
        contact: 'Contact info',
        email: 'email@test.com',
        website: 'http://test.com',
        cities: [],
        themes: [],
        types: {},
        pdf: 'pdf_url',
        bbox: [6.0, 45.0, 6.1, 45.1],
        geometry: { type: 'Point', coordinates: [6.0, 45.0] },
        attachments: [],
        approved: false,
        impracticable: true,
        published_vigilance_areas: [9, 4],
      },
    };

    const touristicContentCategory = {
      id: 1,
      label: 'Hébergement',
      pictogramUri: 'category.svg',
      types: [],
    };

    const mockVigilanceAreas: VigilanceArea[] = [
      {
        id: '9',
        name: 'Area 9',
        type: { id: '1', name: 'Type 1', pictogramUrl: 'icon.svg' },
        criticality: 'info',
        isImpracticable: false,
        periods: [
          {
            startDate: '2026-08-01',
            endDate: '2026-08-31',
            activeDays: [],
            annual: false,
          },
        ],
        geometry: { type: 'Polygon', coordinates: [] },
      },
      {
        id: '4',
        name: 'Area 4 Closed',
        type: { id: '2', name: 'Type 2', pictogramUrl: 'icon2.svg' },
        criticality: 'closed',
        isImpracticable: true,
        periods: [
          {
            startDate: '2026-08-01',
            endDate: '2026-08-31',
            activeDays: [],
            annual: false,
          },
        ],
        geometry: { type: 'Polygon', coordinates: [] },
      },
    ];

    const result = adaptTouristicContentDetails({
      rawTCD,
      touristicContentCategory,
      sourceDictionnary: {},
      cityDictionnary: {},
      themeDictionnary: {},
      publishedVigilanceAreas: mockVigilanceAreas,
    });

    expect(result.isImpracticable).toBe(true);
    expect(result.publishedVigilanceAreas).toHaveLength(2);
    // Closed vigilance area should be sorted first by sortVigilanceAreas
    expect(result.publishedVigilanceAreas?.[0].id).toBe('4');
    expect(result.publishedVigilanceAreas?.[1].id).toBe('9');
  });

  it('should correctly adapt impracticable and published vigilance areas in adaptTouristicContentResult', () => {
    const rawTouristicContentResults: RawTouristicContentResult[] = [
      {
        id: '123',
        attachments: [],
        name: 'Gîte d’étape',
        category: 1,
        description_teaser: 'Bel hébergement',
        themes: [],
        types: {},
        cities: ['05045'],
        impracticable: true,
        published_vigilance_areas: [42],
      },
    ];

    const results = adaptTouristicContentResult({
      rawTouristicContent: rawTouristicContentResults,
      touristicContentCategories: {
        1: { id: 1, label: 'Hébergement', pictogramUri: 'category.svg', types: [] },
      },
      themeDictionnary: {},
      cityDictionnary: {
        '05045': { id: '05045', name: 'Molines-en-Champsaur', code: '05045' },
      },
    });

    expect(results).toHaveLength(1);
    expect(results[0].isImpracticable).toBe(true);
    expect(results[0].publishedVigilanceAreas).toEqual([42]);
    expect(results[0].endDate).toBeNull();
  });

  it('should compute endDate for touristic content when vigilanceAreasPeriods and targetDate are provided', () => {
    const rawTouristicContentResults: RawTouristicContentResult[] = [
      {
        id: '123',
        attachments: [],
        name: 'Gîte d’étape',
        category: 1,
        description_teaser: 'Bel hébergement',
        themes: [],
        types: {},
        cities: ['05045'],
        impracticable: true,
        published_vigilance_areas: [42],
      },
    ];

    const vigilanceAreasPeriods = {
      42: {
        id: 42,
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

    const results = adaptTouristicContentResult({
      rawTouristicContent: rawTouristicContentResults,
      touristicContentCategories: {
        1: { id: 1, label: 'Hébergement', pictogramUri: 'category.svg', types: [] },
      },
      themeDictionnary: {},
      cityDictionnary: {
        '05045': { id: '05045', name: 'Molines-en-Champsaur', code: '05045' },
      },
      vigilanceAreasPeriods,
      targetDate: new Date('2026-10-22T12:00:00'),
    });

    expect(results[0].endDate).toBe('2026-11-18');
  });
});
