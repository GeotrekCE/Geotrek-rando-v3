import { adaptVigilanceArea } from '../adapter';
import { RawVigilanceArea } from '../interface';

describe('adaptVigilanceArea', () => {
  it('should adapt raw vigilance area correctly', () => {
    const raw: RawVigilanceArea = {
      id: 2,
      name: { fr: 'Zone de travaux col de la Fayolle', en: 'Work area' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.1, 44.5],
            [6.2, 44.5],
            [6.2, 44.6],
            [6.1, 44.5],
          ],
        ],
      },
      structure: 1,
      vigilance_area_type: 1,
      practicability: 'closed',
      description: { fr: 'Passage interdit pour travaux', en: 'No access' },
      practical_info: { fr: 'Déviation par le vallon', en: 'Detour' },
      external_info_url: 'https://example.com',
      sources: [],
      start_date: '2026-06-01T00:00:00Z',
      end_date: '2026-09-30T00:00:00Z',
      active_days: [1, 2, 3, 4, 5],
      active_months: [6, 7, 8, 9],
      published: true,
      uuid: 'abc-123',
      attachments: [],
    };

    const types = {
      '1': { id: '1', name: 'Travaux', pictogramUrl: null },
    };

    const adapted = adaptVigilanceArea({ rawVigilanceArea: raw, language: 'fr', vigilanceAreaTypes: types });

    expect(adapted.id).toBe('2');
    expect(adapted.name).toBe('Zone de travaux col de la Fayolle');
    expect(adapted.practicability).toBe('closed');
    expect(adapted.type.name).toBe('Travaux');
    expect(adapted.description).toBe('Passage interdit pour travaux');
  });
});
