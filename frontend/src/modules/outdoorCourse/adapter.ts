import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { Service } from 'modules/service/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { getAttachments, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
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
      attachments: getAttachments(rawOutdoorCourse.attachments),
      geometry: adaptGeometry(rawOutdoorCourse.geometry.geometries[0]),
      thumbnailUris: getThumbnails(rawOutdoorCourse.attachments),
      duration: rawOutdoorCourse.duration ? formatHours(rawOutdoorCourse.duration) : null,
      maxElevation: Number(rawOutdoorCourse.max_elevation),
      length: rawOutdoorCourse.length
        ? `${Math.round(rawOutdoorCourse.length)}${dataUnits.distance}`
        : null,
      height: rawOutdoorCourse.height ? `${rawOutdoorCourse.height}${dataUnits.distance}` : null,
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
    children: [],
    gear: String(rawOutdoorCourseDetails.properties.gear),
    equipment: String(rawOutdoorCourseDetails.properties.equipment),
    pdfUri: rawOutdoorCourseDetails.properties.pdf,
    cities: rawOutdoorCourseDetails.properties.cities?.map(id => cityDictionnary[id]?.name) ?? [],
    cities_raw: rawOutdoorCourseDetails.properties.cities,
    ratings:
      rawOutdoorCourseDetails.properties.ratings?.map(r => {
        return {
          ...outdoorRating[String(r)],
          scale: outdoorRatingScale.find(oRS => oRS.id === outdoorRating[String(r)]?.scale),
        };
      }) ?? [],
    ratingsDescription: rawOutdoorCourseDetails.properties.ratings_description,
    typeCourse: outdoorCourseType[Number(rawOutdoorCourseDetails?.properties?.type)],
    id: rawOutdoorCourseDetails.id,
    sensitiveAreas,
    signage,
    service,
    infrastructure,
  };
};
