import { ActivityChoices } from 'modules/activities/interface';
import { MapResults, RawMapResults } from './interface';
import { concatTrekMapResults, formatLocation } from './utils';

export const adaptTrekMapResults = ({
  mapResults,
  activities,
}: {
  mapResults: RawMapResults[];
  activities: ActivityChoices;
}): MapResults =>
  concatTrekMapResults(mapResults).map(rawMapResult => ({
    id: rawMapResult.id,
    location: formatLocation(rawMapResult.parking_location),
    practice: activities[rawMapResult.practice],
  }));
