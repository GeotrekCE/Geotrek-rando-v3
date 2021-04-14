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
  rawSensitiveAreaPractices.reduce(
    (sources, currentSensitiveAreaPractice) => ({
      ...sources,
      [currentSensitiveAreaPractice.id]: adaptSensitiveAreaPractice(currentSensitiveAreaPractice),
    }),
    {},
  );
