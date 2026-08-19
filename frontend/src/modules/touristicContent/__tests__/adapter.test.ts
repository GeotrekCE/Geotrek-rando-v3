import { adaptTouristicContentDetails } from '../adapter';
import { RawTouristicContentDetails } from '../interface';
import { VigilanceArea } from 'modules/vigilanceArea/interface';

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
        closed: true,
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
        startDate: '2026-08-01',
        endDate: '2026-08-31',
        criticality: 'info',
        practicability: 'practicable',
        activeDays: [],
        activeMonths: [],
        geometry: { type: 'Polygon', coordinates: [] },
      },
      {
        id: '4',
        name: 'Area 4 Closed',
        type: { id: '2', name: 'Type 2', pictogramUrl: 'icon2.svg' },
        startDate: '2026-08-01',
        endDate: '2026-08-31',
        criticality: 'closed',
        practicability: 'closed',
        activeDays: [],
        activeMonths: [],
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

    expect(result.isClosed).toBe(true);
    expect(result.publishedVigilanceAreas).toHaveLength(2);
    // Closed vigilance area should be sorted first by sortVigilanceAreas
    expect(result.publishedVigilanceAreas?.[0].id).toBe('4');
    expect(result.publishedVigilanceAreas?.[1].id).toBe('9');
  });
});
