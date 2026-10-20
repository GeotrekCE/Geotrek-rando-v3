import { getVigilanceAreaTypes } from 'modules/vigilanceAreaType/connector';
import { getVigilanceAreaLevels } from 'modules/vigilanceAreaLevel/connector';
import { getSources } from 'modules/source/connector';
import { adaptVigilanceArea, adaptVigilanceAreas, adaptVigilancePeriods } from './adapter';
import { fetchVigilanceArea, fetchVigilanceAreasPeriods } from './api';
import { VigilanceArea, VigilanceAreasPeriodsMap } from './interface';

export const getVigilanceAreasForTrek = async (
  rawAreas: any[] = [],
  language: string,
): Promise<VigilanceArea[]> => {
  if (!rawAreas || rawAreas.length === 0) return [];

  const [vigilanceAreaTypes, vigilanceAreaLevels, sourcesDictionnary] = await Promise.all([
    getVigilanceAreaTypes(language),
    getVigilanceAreaLevels(language),
    getSources(language),
  ]);

  const containsIds = rawAreas.some(item => typeof item === 'number' || typeof item === 'string');

  if (!containsIds) {
    return adaptVigilanceAreas({
      rawVigilanceAreas: rawAreas,
      language,
      vigilanceAreaTypes,
      vigilanceAreaLevels,
      sourcesDictionnary,
    });
  }

  const areas = await Promise.all(
    rawAreas.map(async item => {
      if (typeof item === 'number' || typeof item === 'string') {
        try {
          const rawArea = await fetchVigilanceArea(Number(item), { language });
          if (!rawArea) return null;
          return adaptVigilanceArea({
            rawVigilanceArea: rawArea,
            language,
            vigilanceAreaTypes,
            vigilanceAreaLevels,
            sourcesDictionnary,
          });
        } catch {
          return null;
        }
      }
      return adaptVigilanceArea({
        rawVigilanceArea: item,
        language,
        vigilanceAreaTypes,
        vigilanceAreaLevels,
        sourcesDictionnary,
      });
    }),
  );

  return areas.filter((area): area is VigilanceArea => area !== null);
};

export const getVigilanceAreasPeriods = async (
  language: string,
): Promise<VigilanceAreasPeriodsMap> => {
  try {
    const response = await fetchVigilanceAreasPeriods({ language, page_size: 999 });
    const periodsMap: VigilanceAreasPeriodsMap = {};
    for (const rawArea of response.results) {
      periodsMap[rawArea.id] = {
        id: rawArea.id,
        impracticable: Boolean(rawArea.impracticable),
        periods: adaptVigilancePeriods(rawArea.periods),
      };
    }
    return periodsMap;
  } catch (error) {
    console.warn('Failed to fetch vigilance areas periods:', error);
    return {};
  }
};
