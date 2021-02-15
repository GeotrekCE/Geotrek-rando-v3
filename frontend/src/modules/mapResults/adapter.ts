import { ActivityChoices } from 'modules/activities/interface';
import { MapResults, RawTrekMapResults } from './interface';
import { concatMapResults, formatLocation } from './utils';

export const adaptMapResults = ({
  mapResults,
  activities,
}: {
  mapResults: RawTrekMapResults[];
  activities: ActivityChoices;
}): MapResults =>
  concatMapResults(mapResults).map(rawMapResult => ({
    id: rawMapResult.id,
    location: formatLocation(rawMapResult.parking_location),
    practice: activities[rawMapResult.practice],
  }));
