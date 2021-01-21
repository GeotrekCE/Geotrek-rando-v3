import { MapResults, RawMapResults } from './interface';
import { concatMapResults, formatLocation } from './utils';

export const adaptMapResults = (rawMapResults: RawMapResults[]): MapResults =>
  concatMapResults(rawMapResults).map(rawMapResult => ({
    id: rawMapResult.id,
    location: formatLocation(rawMapResult.parking_location),
  }));
