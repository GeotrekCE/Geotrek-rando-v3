import { Choices, RawDifficulty } from './interface';

export const adaptDifficulties = (rawDifficulties: RawDifficulty[]): Choices =>
  rawDifficulties.reduce(
    (difficulties, currentRawDifficulty) => ({
      ...difficulties,
      [`${currentRawDifficulty.id}`]: { label: currentRawDifficulty.label },
    }),
    {},
  );
