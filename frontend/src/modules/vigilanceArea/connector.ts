import { getVigilanceAreaTypes } from 'modules/vigilanceAreaType/connector';
import { getVigilanceAreaLevels } from 'modules/vigilanceAreaLevel/connector';
import { getSources } from 'modules/source/connector';
import { adaptVigilanceArea, adaptVigilanceAreas } from './adapter';
import { fetchVigilanceArea, fetchVigilanceAreas } from './api';
import { VigilanceArea } from './interface';

export const getVigilanceAreas = async (
  language: string,
  params: Record<string, unknown> = {},
): Promise<VigilanceArea[]> => {
  const [rawVigilanceAreas, vigilanceAreaTypes, vigilanceAreaLevels, sourcesDictionnary] =
    await Promise.all([
      fetchVigilanceAreas({ language, ...params }),
      getVigilanceAreaTypes(language),
      getVigilanceAreaLevels(language),
      getSources(language),
    ]);
  return adaptVigilanceAreas({
    rawVigilanceAreas: rawVigilanceAreas.results,
    language,
    vigilanceAreaTypes,
    vigilanceAreaLevels,
    sourcesDictionnary,
  });
};

export const getVigilanceAreaDetails = async (
  id: number,
  language: string,
): Promise<VigilanceArea | null> => {
  const [rawVigilanceArea, vigilanceAreaTypes, vigilanceAreaLevels, sourcesDictionnary] =
    await Promise.all([
      fetchVigilanceArea(id, { language }),
      getVigilanceAreaTypes(language),
      getVigilanceAreaLevels(language),
      getSources(language),
    ]);
  if (!rawVigilanceArea) return null;
  return adaptVigilanceArea({
    rawVigilanceArea,
    language,
    vigilanceAreaTypes,
    vigilanceAreaLevels,
    sourcesDictionnary,
  });
};

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
