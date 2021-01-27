import { ActivityChoices } from 'modules/activities/interface';
import { MapResults, RawMapResults } from './interface';
import { concatMapResults, formatLocation } from './utils';

export const adaptMapResults = ({
  mapResults,
  activities,
}: {
  mapResults: RawMapResults[];
  activities: ActivityChoices;
}): MapResults =>
  concatMapResults(mapResults).map(rawMapResult => ({
    id: rawMapResult.id,
    location: formatLocation(rawMapResult.parking_location),
    practice: activities[rawMapResult.practice],
  }));
