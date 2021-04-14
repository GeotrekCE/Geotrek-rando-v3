import { adaptSensitiveAreaPractices } from './adapter';
import { fetchSensitiveAreaPractices } from './api';
import { SensitiveAreaPracticeDictionnary } from './interface';

export const getSensitiveAreaPractices = async (
  language: string,
): Promise<SensitiveAreaPracticeDictionnary> => {
  const rawSensitiveAreaPractices = await fetchSensitiveAreaPractices({ language });
  return adaptSensitiveAreaPractices(rawSensitiveAreaPractices.results);
};
