import { RawMapResult, RawMapResults } from './interface';

export const formatLocation = (rawLocation: number[] | null): { x: number; y: number } | null =>
  rawLocation === null
    ? null
    : {
        x: rawLocation[0],
        y: rawLocation[1],
      };

export const concatMapResults = (rawMapResults: RawMapResults[]): RawMapResult[] =>
  rawMapResults.reduce<RawMapResult[]>(
    (rawResults, currentResult) => [...rawResults, ...currentResult.results],
    [],
  );
