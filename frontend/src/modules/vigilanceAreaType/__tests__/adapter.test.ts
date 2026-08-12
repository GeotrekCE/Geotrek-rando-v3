import { adaptVigilanceAreaTypes } from '../adapter';
import { RawVigilanceAreaType } from '../interface';

describe('adaptVigilanceAreaTypes', () => {
  it('should adapt raw vigilance area types to dictionary with object name', () => {
    const raw: RawVigilanceAreaType[] = [
      {
        id: 1,
        name: { fr: 'Chasse', en: 'Hunting' },
        pictogram: 'https://test-admin.geotrek.fr/media/upload/vigilance-chasse.png',
      },
      {
        id: 2,
        name: { fr: 'Travaux', en: 'Work' },
        pictogram: null,
      },
    ];

    const adapted = adaptVigilanceAreaTypes({ rawVigilanceAreaTypes: raw, language: 'fr' });

    expect(adapted['1']).toEqual({
      id: '1',
      name: 'Chasse',
      pictogramUrl: 'https://test-admin.geotrek.fr/media/upload/vigilance-chasse.png',
    });
    expect(adapted['2']).toEqual({
      id: '2',
      name: 'Travaux',
      pictogramUrl: null,
    });
  });

  it('should adapt raw vigilance area types with direct string name', () => {
    const raw: RawVigilanceAreaType[] = [
      {
        id: 1,
        name: 'Pastoralisme',
        pictogram: null,
      },
    ];

    const adapted = adaptVigilanceAreaTypes({ rawVigilanceAreaTypes: raw, language: 'fr' });

    expect(adapted['1']).toEqual({
      id: '1',
      name: 'Pastoralisme',
      pictogramUrl: null,
    });
  });
});
