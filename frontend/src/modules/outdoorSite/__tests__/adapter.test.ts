import { VigilanceArea, VigilanceAreasPeriodsMap } from 'modules/vigilanceArea/interface';
import { adaptOutdoorSiteDetails, adaptoutdoorSitesResult } from '../adapter';
import { RawOutdoorSite, RawOutdoorSiteDetails } from '../interface';

describe('outdoorSite adapter', () => {
  const mockVigilanceAreas: VigilanceArea[] = [
    {
      id: '9',
      name: 'Area 9 Info',
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

  it('should correctly adapt impracticable and vigilance areas in adaptOutdoorSiteDetails', () => {
    const rawOutdoorSiteDetails: RawOutdoorSiteDetails = {
      id: '100',
      name: 'Site Escalade Test',
      attachments: [],
      practice: 1,
      cities: [],
      bbox: [6.0, 45.0, 6.1, 45.1],
      geometry: { type: 'GeometryCollection', geometries: [] },
      properties: {
        id: '100',
        name: 'Site Escalade Test',
        attachments: [],
        practice: 1,
        description: 'Description test',
        advice: 'Advice test',
        ambiance: null,
        description_teaser: null,
        accessibility: undefined,
        period: undefined,
        wind: [],
        orientation: [],
        cities: [],
        themes: [],
        labels: [],
        source: [],
        information_desks: [],
        web_links: undefined,
        pdf: '',
        ratings: [],
        ratings_description: '',
        children: [],
        courses: [],
        view_points: [],
        type: 1,
        geometry: { type: 'GeometryCollection', geometries: [] },
        impracticable: true,
        published_vigilance_areas: [9, 4],
      },
    };

    const result = adaptOutdoorSiteDetails({
      rawOutdoorSiteDetails,
      pois: [],
      touristicContents: [],
      children: [],
      courses: [],
      access: [],
      themeDictionnary: {},
      labelsDictionnary: {},
      sourcesDictionnary: {},
      informationDesksDictionnary: {},
      outdoorPractice: {},
      cityDictionnary: {},
      outdoorRating: {},
      outdoorRatingScale: [],
      outdoorSiteType: {},
      sensitiveAreas: [],
      publishedVigilanceAreas: mockVigilanceAreas,
      signage: null,
      service: null,
      infrastructure: null,
      viewPoints: [],
    });

    expect(result.isImpracticable).toBe(true);
    expect(result.publishedVigilanceAreas).toHaveLength(2);
    // Closed vigilance area should be sorted first
    expect(result.publishedVigilanceAreas?.[0].id).toBe('4');
    expect(result.publishedVigilanceAreas?.[1].id).toBe('9');
  });

  it('should correctly adapt impracticable and vigilance areas in adaptoutdoorSitesResult', () => {
    const rawOutdoorSites: RawOutdoorSite[] = [
      {
        id: '100',
        name: 'Site Escalade Test',
        attachments: [],
        practice: 1,
        geometry: { type: 'GeometryCollection', geometries: [] },
        themes: [],
        cities: [],
        period: undefined,
        wind: [],
        orientation: [],
        impracticable: true,
        published_vigilance_areas: [4],
      },
      {
        id: '101',
        name: 'Site Escalade Open',
        attachments: [],
        practice: 1,
        geometry: { type: 'GeometryCollection', geometries: [] },
        themes: [],
        cities: [],
        period: undefined,
        wind: [],
        orientation: [],
        impracticable: false,
        published_vigilance_areas: [],
      },
    ];

    const vigilanceAreasPeriods: VigilanceAreasPeriodsMap = {
      4: {
        id: 4,
        impracticable: true,
        periods: [
          {
            startDate: '2026-08-01',
            endDate: '2026-08-31',
            activeDays: [],
            annual: false,
          },
        ],
      },
    };

    const results = adaptoutdoorSitesResult({
      rawOutdoorSites,
      themeDictionnary: {},
      outdoorPracticeDictionnary: {},
      cityDictionnary: {},
      vigilanceAreasPeriods,
      targetDate: new Date('2026-08-15'),
    });

    expect(results).toHaveLength(2);
    expect(results[0].isImpracticable).toBe(true);
    expect(results[0].publishedVigilanceAreas).toEqual([4]);
    expect(results[0].endDate).toBe('2026-08-31');

    expect(results[1].isImpracticable).toBe(false);
    expect(results[1].publishedVigilanceAreas).toEqual([]);
    expect(results[1].endDate).toBeNull();
  });
});
