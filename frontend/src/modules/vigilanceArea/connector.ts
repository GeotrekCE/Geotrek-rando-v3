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
