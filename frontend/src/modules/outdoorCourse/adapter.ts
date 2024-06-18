import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { Service } from 'modules/service/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { getLargeImagesOrThumbnailsFromAttachments, getThumbnail } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { PopupResult } from 'modules/trekResult/interface';
import { fallbackImgUri } from 'modules/trekResult/adapter';
import { CityDictionnary } from '../city/interface';
import { OutdoorRatingChoices } from '../outdoorRating/interface';
import { OutdoorRatingScale } from '../outdoorRatingScale/interface';
import { OutdoorSiteTypeChoices } from '../outdoorSiteType/interface';
import { Poi } from '../poi/interface';
import { dataUnits } from '../results/adapter';
import { TouristicContent } from '../touristicContent/interface';
import { formatHours } from '../utils/time';
import {
  OutdoorCourse,
  OutdoorCourseDetails,
  OutdoorCourseResult,
  RawOutdoorCourse,
  RawOutdoorCourseDetails,
} from './interface';

export const adaptOutdoorCourses = ({
  rawOutdoorCourses,
  cityDictionnary,
}: {
  rawOutdoorCourses: RawOutdoorCourse[];
  cityDictionnary: CityDictionnary;
}): OutdoorCourse[] => {
  return rawOutdoorCourses.map(rawOutdoorCourse => {
    return {
      id: rawOutdoorCourse.id,
      name: rawOutdoorCourse.name,
      images: getLargeImagesOrThumbnailsFromAttachments(rawOutdoorCourse.attachments, false),
      geometry: adaptGeometry(rawOutdoorCourse.geometry),
      thumbnails: getLargeImagesOrThumbnailsFromAttachments(rawOutdoorCourse.attachments, true),
      duration:
        typeof rawOutdoorCourse.duration === 'number'
          ? formatHours(rawOutdoorCourse.duration)
          : null,
      maxElevation: Number(rawOutdoorCourse.max_elevation),
      length:
        typeof rawOutdoorCourse.length === 'number'
          ? `${Math.round(rawOutdoorCourse.length)}${dataUnits.distance}`
          : null,
      height:
        typeof rawOutdoorCourse.height === 'number'
          ? `${rawOutdoorCourse.height}${dataUnits.distance}`
          : null,
      themes: [],
      place: cityDictionnary?.[rawOutdoorCourse?.cities?.[0]]?.name ?? '',
    };
  });
};

export const adaptOutdoorCoursesResult = ({
  rawOutdoorCourses,
  cityDictionnary,
}: {
  rawOutdoorCourses: RawOutdoorCourse[];
  cityDictionnary: CityDictionnary;
}): OutdoorCourseResult[] => {
  return rawOutdoorCourses.map(rawOutdoorCourse => {
    return {
      id: rawOutdoorCourse.id,
      name: rawOutdoorCourse.name,
      images: getLargeImagesOrThumbnailsFromAttachments(rawOutdoorCourse.attachments, true),
      geometry: adaptGeometry(rawOutdoorCourse.geometry),
      type: 'OUTDOOR_COURSE',
      informations: [
        {
          label: 'duration',
          value:
            typeof rawOutdoorCourse.duration === 'number'
              ? formatHours(rawOutdoorCourse.duration)
              : '',
        },
        {
          label: 'maxElevation',
          value:
            typeof rawOutdoorCourse.max_elevation === 'number'
              ? `${rawOutdoorCourse.max_elevation}`
              : '',
        },
        {
          label: 'distance',
          value:
            typeof rawOutdoorCourse.length === 'number'
              ? `${Math.round(rawOutdoorCourse.length)}${dataUnits.distance}`
              : '',
        },
        {
          label: 'height',
          value:
            typeof rawOutdoorCourse.height === 'number'
              ? `${rawOutdoorCourse.height}${dataUnits.distance}`
              : '',
        },
      ].filter(item => item.value.length > 0),
      place: cityDictionnary?.[rawOutdoorCourse?.cities?.[0]]?.name ?? '',
    };
  });
};

export const adaptOutdoorCourseDetails = ({
  rawOutdoorCourseDetails,
  pois,
  touristicContents,
  cityDictionnary,
  outdoorRating,
  outdoorRatingScale,
  outdoorCourseType,
  sensitiveAreas,
  signage,
  service,
  infrastructure,
}: {
  rawOutdoorCourseDetails: RawOutdoorCourseDetails;
  pois: Poi[];
  touristicContents: TouristicContent[];
  cityDictionnary: CityDictionnary;
  outdoorRating: OutdoorRatingChoices;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorCourseType: OutdoorSiteTypeChoices;
  sensitiveAreas: SensitiveArea[];
  signage: SignageDictionary | null;
  service: Service[] | null;
  infrastructure: InfrastructureDictionary | null;
}): OutdoorCourseDetails => {
  return {
    // We use the original adapter
    ...adaptOutdoorCourses({
      rawOutdoorCourses: [
        {
          ...rawOutdoorCourseDetails.properties,
          geometry: rawOutdoorCourseDetails.geometry,
        },
      ],
      cityDictionnary,
    })[0],
    // then we add missing fields
    accessibility: rawOutdoorCourseDetails.properties.accessibility,
    description: rawOutdoorCourseDetails.properties.description,
    bbox: {
      corner1: { x: rawOutdoorCourseDetails.bbox[0], y: rawOutdoorCourseDetails.bbox[1] },
      corner2: { x: rawOutdoorCourseDetails.bbox[2], y: rawOutdoorCourseDetails.bbox[3] },
    },
    touristicContents,
    pois,
    advice: rawOutdoorCourseDetails.properties.advice,
    gear: String(rawOutdoorCourseDetails.properties.gear),
    equipment: String(rawOutdoorCourseDetails.properties.equipment),
    pdfUri: rawOutdoorCourseDetails.properties.pdf,
    cities:
      rawOutdoorCourseDetails.properties.cities
        ?.map(id => cityDictionnary[id]?.name ?? null)
        .filter(Boolean) ?? [],
    cities_raw: rawOutdoorCourseDetails.properties.cities,
    ratings:
      rawOutdoorCourseDetails.properties.ratings?.map(r => {
        return {
          ...outdoorRating[String(r)],
          scale: outdoorRatingScale.find(oRS => oRS.id === outdoorRating[String(r)]?.scale) ?? [],
        };
      }) ?? [],
    ratingsDescription: rawOutdoorCourseDetails.properties.ratings_description ?? null,
    typeCourse: outdoorCourseType[Number(rawOutdoorCourseDetails?.properties?.type)] ?? null,
    id: rawOutdoorCourseDetails.id,
    sensitiveAreas,
    signage,
    service,
    infrastructure,
  };
};

export const adaptOutdoorCoursePopupResults = ({
  rawOutdoorSitePopupResult,
  cityDictionnary,
}: {
  rawOutdoorSitePopupResult: RawOutdoorCourseDetails;
  cityDictionnary: CityDictionnary;
}): PopupResult => {
  return {
    title: rawOutdoorSitePopupResult.properties.name,
    place:
      rawOutdoorSitePopupResult?.properties?.cities
        ?.map(city => cityDictionnary?.[city]?.name ?? '')
        .join(', ') ?? '',
    imgUrl: getThumbnail(rawOutdoorSitePopupResult.properties.attachments) ?? fallbackImgUri,
  };
};
