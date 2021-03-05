import { ActivityChoices } from 'modules/activities/interface';
import { TouristicContentCategoryDictionnary } from 'modules/touristicContentCategory/interface';
import { extractFirstPointOfGeometry } from 'modules/utils/geometry';
import { MapResults, RawTouristicContentMapResults, RawTrekMapResults } from './interface';
import { concatTouristicContentMapResults, concatTrekMapResults, formatLocation } from './utils';

export const adaptTrekMapResults = ({
  mapResults,
  activities,
}: {
  mapResults: RawTrekMapResults[];
  activities: ActivityChoices;
}): MapResults =>
  concatTrekMapResults(mapResults).map(rawMapResult => ({
    id: rawMapResult.id,
    location: formatLocation(rawMapResult.departure_geom),
    practice: activities[rawMapResult.practice],
    type: 'TREK',
  }));

export const adaptTouristicContentMapResults = ({
  mapResults,
  touristicContentCategories,
}: {
  mapResults: RawTouristicContentMapResults[];
  touristicContentCategories: TouristicContentCategoryDictionnary;
}): MapResults =>
  concatTouristicContentMapResults(mapResults).map(rawMapResult => ({
    id: rawMapResult.id,
    location: extractFirstPointOfGeometry(rawMapResult.geometry ?? null),
    practice: {
      pictogram:
        rawMapResult.category !== undefined
          ? touristicContentCategories[rawMapResult.category].pictogramUri
          : '',
      name:
        rawMapResult.category !== undefined
          ? touristicContentCategories[rawMapResult.category].label
          : '',
    },
    type: 'TOURISTIC_CONTENT',
  }));
