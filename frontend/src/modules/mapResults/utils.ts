import { RawOutdoorSite } from '../outdoorSite/interface';
import { RawTouristicEvent } from '../touristicEvent/interface';
import {
  RawOutdoorSiteMapResults,
  RawTouristicContentMapResult,
  RawTouristicContentMapResults,
  RawTouristicEventsMapResults,
  RawTrekMapResult,
  RawTrekMapResults,
} from './interface';

export const formatLocation = (
  rawLocation: [number, number] | null,
): { x: number; y: number } | null =>
  rawLocation === null
    ? null
    : {
        x: rawLocation[0],
        y: rawLocation[1],
      };

export const concatTrekMapResults = (rawMapResults: RawTrekMapResults[]): RawTrekMapResult[] =>
  rawMapResults.reduce<RawTrekMapResult[]>(
    (rawResults, currentResult) => [...rawResults, ...currentResult.results],
    [],
  );

export const concatTouristicContentMapResults = (
  rawMapResults: RawTouristicContentMapResults[],
): RawTouristicContentMapResult[] =>
  rawMapResults.reduce<RawTouristicContentMapResult[]>(
    (rawResults, currentResult) => [...rawResults, ...currentResult.results],
    [],
  );

export const concatOutdoorMapResults = (
  rawMapResults: RawOutdoorSiteMapResults[],
): RawOutdoorSite[] =>
  rawMapResults.reduce<RawOutdoorSite[]>(
    (rawResults, currentResult) => [...rawResults, ...currentResult.results],
    [],
  );

export const concatTouristicEventsMapResults = (
  rawMapResults: RawTouristicEventsMapResults[],
): RawTouristicEvent[] =>
  rawMapResults.reduce<RawTouristicEvent[]>(
    (rawResults, currentResult) => [...rawResults, ...currentResult.results],
    [],
  );
