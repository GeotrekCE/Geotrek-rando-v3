import { Options } from 'prettier';
import { RawDifficulty } from '../interface';

export const adaptDifficulties = (rawDifficulties: RawDifficulty[]): Options =>
  rawDifficulties.reduce(
    (difficulties, currentRawDifficulty) => ({
      ...difficulties,
      [`${currentRawDifficulty.id}`]: { label: currentRawDifficulty.label },
    }),
    {},
  );
