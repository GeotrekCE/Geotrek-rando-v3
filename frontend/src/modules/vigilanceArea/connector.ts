import { getVigilanceAreaTypes } from 'modules/vigilanceAreaType/connector';
import { getVigilanceAreaLevels } from 'modules/vigilanceAreaLevel/connector';
import { getSources } from 'modules/source/connector';
import { generatePageNumbersArray } from 'modules/utils/connector';
import { concatResults } from 'modules/utils/adapter';
import { getGlobalConfig } from 'modules/utils/api.config';
import { adaptVigilanceArea, adaptVigilanceAreas, adaptVigilancePeriods } from './adapter';
import { fetchVigilanceArea, fetchVigilanceAreasPeriods } from './api';
import { RawVigilanceArea, VigilanceArea, VigilanceAreasPeriodsMap } from './interface';

export const getVigilanceAreasForTrek = async (
  rawAreas: (number | string | RawVigilanceArea)[] = [],
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
      rawVigilanceAreas: rawAreas as RawVigilanceArea[],
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
    const resultsNumber = getGlobalConfig().mapResultsPageSize ?? 50;
    const firstPageResponse = await fetchVigilanceAreasPeriods({
      language,
      page_size: resultsNumber,
    });
    let rawVigilanceAreas = firstPageResponse.results;

    if (firstPageResponse.count > resultsNumber) {
      const otherPages = await Promise.all(
        generatePageNumbersArray(resultsNumber, firstPageResponse.count)
          .slice(1)
          .map(pageNumber =>
            fetchVigilanceAreasPeriods({
              language,
              page_size: resultsNumber,
              page: pageNumber,
            }),
          ),
      );
      rawVigilanceAreas = concatResults([firstPageResponse, ...otherPages]);
    }

    const periodsMap: VigilanceAreasPeriodsMap = {};
    for (const rawVigilanceArea of rawVigilanceAreas) {
      periodsMap[rawVigilanceArea.id] = {
        id: rawVigilanceArea.id,
        impracticable: Boolean(rawVigilanceArea.impracticable),
        periods: adaptVigilancePeriods(rawVigilanceArea.periods),
      };
    }
    return periodsMap;
  } catch (error) {
    console.warn('Failed to fetch vigilance areas periods:', error);
    return {};
  }
};
