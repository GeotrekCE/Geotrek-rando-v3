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
      rawName: 'Chasse',
      parent: null,
      pictogramUrl: 'https://test-admin.geotrek.fr/media/upload/vigilance-chasse.png',
    });
    expect(adapted['2']).toEqual({
      id: '2',
      name: 'Travaux',
      rawName: 'Travaux',
      parent: null,
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
      rawName: 'Pastoralisme',
      parent: null,
      pictogramUrl: null,
    });
  });

  it('should format hierarchical types as Type - Sous-type up to level 2', () => {
    const raw: RawVigilanceAreaType[] = [
      {
        id: 1,
        name: 'Pastoralisme',
        parent: null,
        pictogram: null,
      },
      {
        id: 13,
        name: 'Chien de protection de troupeaux',
        parent: 1,
        pictogram: null,
      },
      {
        id: 6,
        name: 'Événementiel',
        parent: null,
        pictogram: null,
      },
      {
        id: 11,
        name: 'Révolte',
        parent: 6,
        pictogram: null,
      },
      {
        id: 12,
        name: 'Manifestation',
        parent: 11,
        pictogram: null,
      },
    ];

    const adapted = adaptVigilanceAreaTypes({ rawVigilanceAreaTypes: raw, language: 'fr' });

    expect(adapted['1'].name).toBe('Pastoralisme');
    expect(adapted['13'].name).toBe('Pastoralisme > Chien de protection de troupeaux');
    expect(adapted['11'].name).toBe('Événementiel > Révolte');
    // Level 3 resolves to Level 1 > Level 2
    expect(adapted['12'].name).toBe('Événementiel > Révolte');
  });
});
