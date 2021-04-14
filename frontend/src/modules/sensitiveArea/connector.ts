import { adaptSensitiveAreas } from './adapter';
import { fetchSensitiveAreas } from './api';
import { SensitiveArea } from './interface';

export const getSensitiveAreas = async (
  trekId: number,
  language: string,
): Promise<SensitiveArea[]> => {
  const [rawSensitiveAreas] = await Promise.all([fetchSensitiveAreas(trekId, { language })]);
  return adaptSensitiveAreas({
    rawSensitiveAreas: rawSensitiveAreas.results,
  });
};
