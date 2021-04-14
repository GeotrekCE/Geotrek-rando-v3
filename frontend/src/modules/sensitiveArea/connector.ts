import { getSensitiveAreaPractices } from 'modules/sensitiveAreaPractice/connector';
import { adaptSensitiveAreas } from './adapter';
import { fetchSensitiveAreas } from './api';
import { SensitiveArea } from './interface';

export const getSensitiveAreas = async (
  trekId: number,
  language: string,
): Promise<SensitiveArea[]> => {
  const [rawSensitiveAreas, sensitiveAreaPracticeDictionnary] = await Promise.all([
    fetchSensitiveAreas(trekId, { language }),
    getSensitiveAreaPractices(language),
  ]);
  return adaptSensitiveAreas({
    rawSensitiveAreas: rawSensitiveAreas.results,
    sensitiveAreaPracticeDictionnary,
  });
};
