import { MapResults, RawMapResults } from './interface';
import { formatLocation } from './utils';

export const adaptMapResults = (rawMapResults: RawMapResults): MapResults =>
  rawMapResults.results.map(rawMapResult => ({
    id: rawMapResult.id,
    location: formatLocation(rawMapResult.parking_location),
  }));
