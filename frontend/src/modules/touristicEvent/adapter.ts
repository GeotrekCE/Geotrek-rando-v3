import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import {
  RawTouristicEvent,
  RawTouristicEventDetails,
  TouristicEvent,
  TouristicEventDetails,
} from './interface';

export const adaptTouristicEvents = ({
  rawTouristicEvents,
}: {
  rawTouristicEvents: RawTouristicEvent[];
}): TouristicEvent[] => {
  return rawTouristicEvents.map(rawTouristicEvent => {
    return {
      id: rawTouristicEvent.id,
      name: rawTouristicEvent.name,
      attachments: getAttachments(rawTouristicEvent.attachments),
      geometry: adaptGeometry(rawTouristicEvent.geometry.geometries[0]),
      thumbnailUris: getThumbnails(rawTouristicEvent.attachments),
    };
  });
};

export const adaptTouristicEventDetails = ({
  rawTouristicEventDetails,
}: {
  rawTouristicEventDetails: RawTouristicEventDetails;
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
    })[0],
    // then we add missing fields
    description: rawTouristicEventDetails.properties.description,
    descriptionTeaser: rawTouristicEventDetails.properties.description_teaser,
    bbox: {
      corner1: { x: rawTouristicEventDetails.bbox[0], y: rawTouristicEventDetails.bbox[1] },
      corner2: { x: rawTouristicEventDetails.bbox[2], y: rawTouristicEventDetails.bbox[3] },
    },
    id: rawTouristicEventDetails.id,
  };
};
