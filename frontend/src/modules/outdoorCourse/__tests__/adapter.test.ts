import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { adaptOutdoorCourseDetails, adaptOutdoorCoursesResult } from '../adapter';
import { RawOutdoorCourse, RawOutdoorCourseDetails } from '../interface';

describe('outdoorCourse adapter', () => {
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

  it('should correctly adapt impracticable and vigilance areas in adaptOutdoorCourseDetails', () => {
    const rawOutdoorCourseDetails: RawOutdoorCourseDetails = {
      id: '200',
      name: 'Parcours Test',
      attachments: [],
      duration: 2.5,
      cities: [],
      bbox: [6.0, 45.0, 6.1, 45.1],
      geometry: { type: 'GeometryCollection', geometries: [] },
      properties: {
        id: '200',
        name: 'Parcours Test',
        attachments: [],
        description: 'Description test',
        advice: 'Advice test',
        accessibility: 'Accessible',
        gear: 'Gear test',
        equipment: 'Equipment test',
        pdf: '',
        duration: 2.5,
        max_elevation: 1200,
        length: 5000,
        height: 300,
        cities: [],
        ratings: [],
        ratings_description: '',
        site: 1,
        structure: 1,
        url: 'http://test.com',
        type: 1,
        geometry: { type: 'GeometryCollection', geometries: [] },
        impracticable: true,
        published_vigilance_areas: [9, 4],
      },
    };

    const result = adaptOutdoorCourseDetails({
      rawOutdoorCourseDetails,
      pois: [],
      touristicContents: [],
      cityDictionnary: {},
      outdoorRating: {},
      outdoorRatingScale: [],
      outdoorCourseType: {},
      sensitiveAreas: [],
      publishedVigilanceAreas: mockVigilanceAreas,
      signage: null,
      service: null,
      infrastructure: null,
    });

    expect(result.isImpracticable).toBe(true);
    expect(result.publishedVigilanceAreas).toHaveLength(2);
    // Closed vigilance area should be sorted first
    expect(result.publishedVigilanceAreas?.[0].id).toBe('4');
    expect(result.publishedVigilanceAreas?.[1].id).toBe('9');
  });

  it('should correctly adapt impracticable in adaptOutdoorCoursesResult', () => {
    const rawOutdoorCourses: RawOutdoorCourse[] = [
      {
        id: '200',
        name: 'Parcours Closed',
        attachments: [],
        geometry: { type: 'GeometryCollection', geometries: [] },
        duration: 2.5,
        max_elevation: 1200,
        length: 5000,
        height: 300,
        cities: [],
        impracticable: true,
        published_vigilance_areas: [4],
      },
      {
        id: '201',
        name: 'Parcours Open',
        attachments: [],
        geometry: { type: 'GeometryCollection', geometries: [] },
        duration: 1.0,
        max_elevation: 800,
        length: 2000,
        height: 100,
        cities: [],
        impracticable: false,
        published_vigilance_areas: [],
      },
    ];

    const results = adaptOutdoorCoursesResult({
      rawOutdoorCourses,
      cityDictionnary: {},
    });

    expect(results).toHaveLength(2);
    expect(results[0].isImpracticable).toBe(true);
    expect(results[1].isImpracticable).toBe(false);
  });
});
