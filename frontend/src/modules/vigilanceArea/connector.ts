import { getVigilanceAreaTypes } from 'modules/vigilanceAreaType/connector';
import { getVigilanceAreaLevels } from 'modules/vigilanceAreaLevel/connector';
import { getSources } from 'modules/source/connector';
import { adaptVigilanceArea, adaptVigilanceAreas } from './adapter';
import { fetchVigilanceArea } from './api';
import { VigilanceArea } from './interface';

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
