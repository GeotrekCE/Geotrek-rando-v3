import {
  geFilesFromAttachments,
  getLargeImagesOrThumbnailsFromAttachments,
  getThumbnail,
} from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { CityDictionnary } from '../city/interface';
import { Choices } from '../filters/interface';
import { SourceDictionnary } from '../source/interface';
import { TouristicContent } from '../touristicContent/interface';
import { TouristicEventTypeChoices } from '../touristicEventType/interface';
import { fallbackImgUri } from '../trekResult/adapter';
import { PopupResult } from '../trekResult/interface';
import { getGlobalConfig } from '../utils/api.config';
import {
  RawTouristicEvent,
  RawTouristicEventDetails,
  TouristicEvent,
  TouristicEventDetails,
  TouristicEventResult,
} from './interface';

const getISOdate = (date: string, time: string) =>
  date.includes('T') ? date : `${date}T${time ? time : '00:00:00'}`;

export const adaptTouristicEvents = ({
  rawTouristicEvents,
  themeDictionnary,
  cityDictionnary,
  touristicEventType,
}: {
  rawTouristicEvents: RawTouristicEvent[];
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
  touristicEventType: TouristicEventTypeChoices;
}): TouristicEvent[] => {
  return rawTouristicEvents.map(rawTouristicEvent => {
    return {
      id: rawTouristicEvent.id,
      name: rawTouristicEvent.name,
      images: getLargeImagesOrThumbnailsFromAttachments(rawTouristicEvent.attachments, false),
      filesFromAttachments: geFilesFromAttachments(rawTouristicEvent.attachments),
      geometry: adaptGeometry(rawTouristicEvent.geometry),
      tags: rawTouristicEvent?.themes?.map(themeId => themeDictionnary[themeId]?.label) ?? [],
      place: cityDictionnary?.[rawTouristicEvent?.cities?.[0]]?.name ?? '',
      category: touristicEventType[Number(rawTouristicEvent?.type)],
      informations: {
        logoUri: rawTouristicEvent.approved
          ? getGlobalConfig().touristicContentLabelImageUri
          : null,
        dates: {
          beginDate: getISOdate(rawTouristicEvent.begin_date, rawTouristicEvent.start_time),
          hasBeginTime: Boolean(rawTouristicEvent.start_time),
          endDate: getISOdate(rawTouristicEvent.end_date, rawTouristicEvent.end_time),
          hasEndTime: Boolean(rawTouristicEvent.end_time),
        },
      },
    };
  });
};

export const adaptTouristicEventsResult = ({
  rawTouristicEvents,
  themeDictionnary,
  cityDictionnary,
  touristicEventType,
}: {
  rawTouristicEvents: RawTouristicEvent[];
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
  touristicEventType: TouristicEventTypeChoices;
}): TouristicEventResult[] => {
  return rawTouristicEvents.map(rawTouristicEvent => {
    return {
      id: `${rawTouristicEvent.id}`,
      type: 'TOURISTIC_EVENT',
      name: rawTouristicEvent.name,
      images: getLargeImagesOrThumbnailsFromAttachments(rawTouristicEvent.attachments, true),
      geometry: adaptGeometry(rawTouristicEvent.geometry),
      tags: rawTouristicEvent?.themes?.map(themeId => themeDictionnary[themeId]?.label) ?? [],
      place: cityDictionnary?.[rawTouristicEvent?.cities?.[0]]?.name ?? '',
      category: touristicEventType[Number(rawTouristicEvent?.type)],
      informations: [
        {
          label: 'date',
          value: [
            getISOdate(rawTouristicEvent.begin_date, rawTouristicEvent.start_time),
            getISOdate(rawTouristicEvent.end_date, rawTouristicEvent.end_time),
          ],
        },
      ],
      logoUri: rawTouristicEvent.approved ? getGlobalConfig().touristicContentLabelImageUri : null,
    };
  });
};

export const adaptTouristicEventDetails = ({
  rawTouristicEventDetails,
  themeDictionnary,
  cityDictionnary,
  sourcesDictionnary,
  touristicContents,
  touristicEventType,
}: {
  rawTouristicEventDetails: RawTouristicEventDetails;
  themeDictionnary: Choices;
  cityDictionnary: CityDictionnary;
  touristicContents: TouristicContent[];
  sourcesDictionnary: SourceDictionnary;
  touristicEventType: TouristicEventTypeChoices;
}): TouristicEventDetails => {
  const touristicEvents = adaptTouristicEvents({
    rawTouristicEvents: [
      {
        ...rawTouristicEventDetails.properties,
        geometry: rawTouristicEventDetails.geometry,
      },
    ],
    themeDictionnary,
    cityDictionnary,
    touristicEventType,
  })[0];
  return {
    // We use the original adapter
    ...touristicEvents,
    // then we add missing fields
    description: rawTouristicEventDetails.properties.description,
    descriptionTeaser: rawTouristicEventDetails.properties.description_teaser ?? null,
    bbox: {
      corner1: { x: rawTouristicEventDetails.bbox[0], y: rawTouristicEventDetails.bbox[1] },
      corner2: { x: rawTouristicEventDetails.bbox[2], y: rawTouristicEventDetails.bbox[3] },
    },
    cities: rawTouristicEventDetails.properties.cities?.map(id => cityDictionnary[id]?.name) ?? [],
    cities_raw: rawTouristicEventDetails.properties.cities,
    id: rawTouristicEventDetails.id,
    touristicContents,
    informations: {
      ...touristicEvents.informations,
      participantNumber: rawTouristicEventDetails.properties.participant_number,
      meetingPoint: rawTouristicEventDetails.properties.meeting_point,
      duration: rawTouristicEventDetails.properties.duration,
    },
    pdfUri: rawTouristicEventDetails.properties.pdf,
    sources:
      rawTouristicEventDetails?.properties?.source?.map(sourceId => sourcesDictionnary[sourceId]) ??
      [],
    contact: rawTouristicEventDetails.properties.contact,
    email: rawTouristicEventDetails.properties.email,
    website: rawTouristicEventDetails.properties.website,
    accessibility: rawTouristicEventDetails.properties.accessibility,
    organizer: rawTouristicEventDetails.properties.organizer,
    speaker: rawTouristicEventDetails.properties.speaker,
    targetAudience: rawTouristicEventDetails.properties.target_audience,
    practicalInfo: rawTouristicEventDetails.properties.practical_info,
    booking: rawTouristicEventDetails.properties.booking,
  };
};

export const adaptTouristicEventPopupResults = ({
  rawTouristicEventPopupResult,
  cityDictionnary,
}: {
  rawTouristicEventPopupResult: RawTouristicEventDetails;
  cityDictionnary: CityDictionnary;
}): PopupResult => {
  return {
    title: rawTouristicEventPopupResult.properties.name,
    place: cityDictionnary?.[rawTouristicEventPopupResult?.properties?.cities?.[0]]?.name ?? '',
    imgUrl: getThumbnail(rawTouristicEventPopupResult.properties.attachments) ?? fallbackImgUri,
  };
};
