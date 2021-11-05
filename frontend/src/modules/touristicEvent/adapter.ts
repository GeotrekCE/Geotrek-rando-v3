import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { CityDictionnary } from '../city/interface';
import { Choices } from '../filters/interface';
import {
  RawTouristicEvent,
  RawTouristicEventDetails,
  TouristicEvent,
  TouristicEventDetails,
} from './interface';

export const adaptTouristicEvents = ({
  rawTouristicEvents,
  themeDictionnary,
  cityDictionnary,
}: {
  rawTouristicEvents: RawTouristicEvent[];
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
}): TouristicEvent[] => {
  return rawTouristicEvents.map(rawTouristicEvent => {
    return {
      id: rawTouristicEvent.id,
      type: 'TOURISTIC_EVENT',
      name: rawTouristicEvent.name,
      attachments: getAttachments(rawTouristicEvent.attachments),
      geometry: adaptGeometry(rawTouristicEvent.geometry.geometries[0]),
      thumbnailUris: getThumbnails(rawTouristicEvent.attachments),
      themes: rawTouristicEvent?.themes?.map(themeId => themeDictionnary[themeId]?.label) ?? [],
      place: cityDictionnary?.[rawTouristicEvent?.cities?.[0]]?.name ?? '',
    };
  });
};

export const adaptTouristicEventDetails = ({
  rawTouristicEventDetails,
  themeDictionnary,
  cityDictionnary,
}: {
  rawTouristicEventDetails: RawTouristicEventDetails;
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
}): TouristicEventDetails => {
  return {
    // We use the original adapter
    ...adaptTouristicEvents({
      rawTouristicEvents: [
        {
          ...rawTouristicEventDetails.properties,
          geometry: rawTouristicEventDetails.geometry,
        },
      ],
      themeDictionnary,
      cityDictionnary,
    })[0],
    // then we add missing fields
    description: rawTouristicEventDetails.properties.description,
    descriptionTeaser: rawTouristicEventDetails.properties.description_teaser,
    bbox: {
      corner1: { x: rawTouristicEventDetails.bbox[0], y: rawTouristicEventDetails.bbox[1] },
      corner2: { x: rawTouristicEventDetails.bbox[2], y: rawTouristicEventDetails.bbox[3] },
    },
    cities: rawTouristicEventDetails.properties.cities?.map(id => cityDictionnary[id]?.name) ?? [],
    id: rawTouristicEventDetails.id,
  };
};
