import { getVigilanceAreaTypes } from 'modules/vigilanceAreaType/connector';
import { adaptVigilanceArea, adaptVigilanceAreas } from './adapter';
import { fetchVigilanceArea, fetchVigilanceAreas } from './api';
import { VigilanceArea } from './interface';

export const getVigilanceAreas = async (
  language: string,
  params: Record<string, unknown> = {},
): Promise<VigilanceArea[]> => {
  const [rawVigilanceAreas, vigilanceAreaTypes] = await Promise.all([
    fetchVigilanceAreas({ language, ...params }),
    getVigilanceAreaTypes(language),
  ]);
  return adaptVigilanceAreas({
    rawVigilanceAreas: rawVigilanceAreas.results,
    language,
    vigilanceAreaTypes,
  });
};

export const getVigilanceAreaDetails = async (
  id: number,
  language: string,
): Promise<VigilanceArea | null> => {
  const [rawVigilanceArea, vigilanceAreaTypes] = await Promise.all([
    fetchVigilanceArea(id, { language }),
    getVigilanceAreaTypes(language),
  ]);
  if (!rawVigilanceArea) return null;
  return adaptVigilanceArea({ rawVigilanceArea, language, vigilanceAreaTypes });
};

export const getVigilanceAreasForTrek = async (
  rawAreas: any[] = [],
  language: string,
): Promise<VigilanceArea[]> => {
  if (!rawAreas || rawAreas.length === 0) return [];

  const vigilanceAreaTypes = await getVigilanceAreaTypes(language);

  const containsIds = rawAreas.some(item => typeof item === 'number' || typeof item === 'string');

  if (!containsIds) {
    return adaptVigilanceAreas({
      rawVigilanceAreas: rawAreas,
      language,
      vigilanceAreaTypes,
    });
  }

  const areas = await Promise.all(
    rawAreas.map(async item => {
      if (typeof item === 'number' || typeof item === 'string') {
        const rawArea = await fetchVigilanceArea(Number(item), { language });
        if (!rawArea) return null;
        return adaptVigilanceArea({ rawVigilanceArea: rawArea, language, vigilanceAreaTypes });
      }
      return adaptVigilanceArea({ rawVigilanceArea: item, language, vigilanceAreaTypes });
    }),
  );

  return areas.filter((area): area is VigilanceArea => area !== null);
};
