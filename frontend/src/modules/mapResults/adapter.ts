import { ActivityChoices } from 'modules/activities/interface';
import { TouristicContentCategoryDictionnary } from 'modules/touristicContentCategory/interface';
import { extractFirstPointOfGeometry } from 'modules/utils/geometry';
import { RawOutdoorSite } from '../outdoorSite/interface';
import {
  MapResults,
  RawOutdoorSiteMapResults,
  RawTouristicContentMapResults,
  RawTrekMapResults,
} from './interface';
import {
  concatOutdoorMapResults,
  concatTouristicContentMapResults,
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

export const adaptOutdoorSitesMapResults = ({
  mapResults,
}: {
  mapResults: RawOutdoorSiteMapResults[];
}): MapResults =>
  concatOutdoorMapResults(mapResults).map(rawMapResult => {
    return {
      id: Number(rawMapResult.id),
      location: extractFirstPointOfGeometry(rawMapResult.geometry ?? null),
      practice: {
        pictogram: '',
        name: '',
      },
      type: 'OUTDOOR_SITE',
    };
  });
