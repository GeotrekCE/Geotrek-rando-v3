import { ActivityChoices } from 'modules/activities/interface';
import { TouristicContentCategoryDictionnary } from 'modules/touristicContentCategory/interface';
import { extractFirstPointOfGeometry } from 'modules/utils/geometry';
import { OutdoorPracticeChoices } from '../outdoorPractice/interface';
import { TouristicEventTypeChoices } from '../touristicEventType/interface';
import {
  MapResults,
  RawOutdoorSiteMapResults,
  RawTouristicContentMapResults,
  RawTouristicEventsMapResults,
  RawTrekMapResults,
} from './interface';
import {
  concatOutdoorMapResults,
  concatTouristicContentMapResults,
  concatTouristicEventsMapResults,
  concatTrekMapResults,
  formatLocation,
} from './utils';

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
      id: 0,
      pictogramUri:
        rawMapResult.category !== undefined
          ? touristicContentCategories[rawMapResult.category]?.pictogramUri
          : '',
      label:
        rawMapResult.category !== undefined
          ? touristicContentCategories[rawMapResult.category]?.label
          : '',
    },
    type: 'TOURISTIC_CONTENT',
  }));

export const adaptOutdoorSitesMapResults = ({
  mapResults,
  outdoorPracticeDictionnary,
}: {
  mapResults: RawOutdoorSiteMapResults[];
  outdoorPracticeDictionnary: OutdoorPracticeChoices;
}): MapResults =>
  concatOutdoorMapResults(mapResults).map(rawMapResult => {
    return {
      id: Number(rawMapResult.id),
      location: extractFirstPointOfGeometry(rawMapResult.geometry ?? null),
      practice: outdoorPracticeDictionnary[rawMapResult.practice] ?? null,
      type: 'OUTDOOR_SITE',
    };
  });

export const adaptTouristicEventsMapResults = ({
  mapResults,
  touristicEventTypes,
}: {
  mapResults: RawTouristicEventsMapResults[];
  touristicEventTypes: TouristicEventTypeChoices;
}): MapResults =>
  concatTouristicEventsMapResults(mapResults).map(rawMapResult => {
    return {
      id: Number(rawMapResult.id),
      location: extractFirstPointOfGeometry(rawMapResult.geometry ?? null),
      practice:
        touristicEventTypes[rawMapResult.type] !== undefined
          ? {
              id: 0,
              label: String(touristicEventTypes[rawMapResult.type].label),
              pictogramUri: touristicEventTypes[rawMapResult.type].pictogramUri,
            }
          : undefined,
      type: 'TOURISTIC_EVENT',
    };
  });
