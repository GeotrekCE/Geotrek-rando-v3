import {
  RawSensitiveAreaPractice,
  SensitiveAreaPractice,
  SensitiveAreaPracticeDictionnary,
} from './interface';

const adaptSensitiveAreaPractice = (
  rawSensitiveAreaPractice: RawSensitiveAreaPractice,
): SensitiveAreaPractice => ({
  name: rawSensitiveAreaPractice.name,
});

export const adaptSensitiveAreaPractices = (
  rawSensitiveAreaPractices: RawSensitiveAreaPractice[],
): SensitiveAreaPracticeDictionnary =>
  Object.fromEntries(rawSensitiveAreaPractices.map(sensitiveAreasPractice => [sensitiveAreasPractice.id, adaptSensitiveAreaPractice(sensitiveAreasPractice)]));
