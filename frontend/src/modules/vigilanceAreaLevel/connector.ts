import { adaptVigilanceAreaLevels } from './adapter';
import { fetchVigilanceAreaLevels } from './api';
import { VigilanceAreaLevel } from './interface';

export const getVigilanceAreaLevels = async (
  language: string,
): Promise<Record<string, VigilanceAreaLevel>> => {
  try {
    const rawVigilanceAreaLevels = await fetchVigilanceAreaLevels({ language });
    return adaptVigilanceAreaLevels({
      rawVigilanceAreaLevels: rawVigilanceAreaLevels.results,
      language,
    });
  } catch {
    return {};
  }
};
