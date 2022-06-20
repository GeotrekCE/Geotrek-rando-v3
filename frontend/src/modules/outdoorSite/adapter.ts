import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { Service } from 'modules/service/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { getAttachments, getThumbnail, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { CityDictionnary } from '../city/interface';
import { Choices } from '../filters/interface';
import { InformationDeskDictionnary } from '../informationDesk/interface';
import { LabelDictionnary } from '../label/interface';
import { OutdoorCourse } from '../outdoorCourse/interface';
import { OutdoorPracticeChoices } from '../outdoorPractice/interface';
import { OutdoorRatingChoices } from '../outdoorRating/interface';
import { OutdoorRatingScale } from '../outdoorRatingScale/interface';
import { OutdoorSiteTypeChoices } from '../outdoorSiteType/interface';
import { Poi } from '../poi/interface';
import { TrekResult } from '../results/interface';
import { SourceDictionnary } from '../source/interface';
import { TouristicContent } from '../touristicContent/interface';
import { fallbackImgUri } from '../trekResult/adapter';
import { PopupResult } from '../trekResult/interface';
import {
  OutdoorSite,
  OutdoorSiteDetails,
  RawOutdoorSite,
  RawOutdoorSiteDetails,
} from './interface';

export const adaptOutdoorSites = ({
  rawOutdoorSites,
  themeDictionnary,
  outdoorPracticeDictionnary,
  cityDictionnary,
}: {
  rawOutdoorSites: RawOutdoorSite[];
  themeDictionnary: Choices;
  outdoorPracticeDictionnary: OutdoorPracticeChoices;
  cityDictionnary: CityDictionnary;
}): OutdoorSite[] =>
  rawOutdoorSites.map(rawOutdoorSite => {
    return {
      id: rawOutdoorSite.id,
      type: 'OUTDOOR_SITE',
      name: rawOutdoorSite.name,
      thumbnailUris: getThumbnails(rawOutdoorSite.attachments),
      attachments: getAttachments(rawOutdoorSite.attachments),
      geometry: adaptGeometry(rawOutdoorSite.geometry.geometries[0]),
      themes: rawOutdoorSite?.themes?.map(themeId => themeDictionnary[themeId]?.label) ?? [],
      practice: outdoorPracticeDictionnary[rawOutdoorSite.practice] ?? null,
      period: rawOutdoorSite?.period ? rawOutdoorSite?.period : null,
      wind: rawOutdoorSite?.wind ?? [],
      orientation: rawOutdoorSite?.orientation ?? [],
      place:
        rawOutdoorSite?.cities?.map(city => cityDictionnary?.[city]?.name ?? '').join(', ') ?? '',
    };
  });

export const adaptOutdoorSiteDetails = ({
  rawOutdoorSiteDetails,
  pois,
  touristicContents,
  children,
  themeDictionnary,
  labelsDictionnary,
  sourcesDictionnary,
  informationDesksDictionnary,
  courses,
  outdoorPracticeDictionnary,
  access,
  outdoorPractice,
  cityDictionnary,
  outdoorRating,
  outdoorRatingScale,
  outdoorSiteType,
  sensitiveAreas,
  signage,
  service,
  infrastructure,
}: {
  rawOutdoorSiteDetails: RawOutdoorSiteDetails;
  pois: Poi[];
  touristicContents: TouristicContent[];
  children: OutdoorSite[];
  themeDictionnary: Choices;
  labelsDictionnary: LabelDictionnary;
  sourcesDictionnary: SourceDictionnary;
  informationDesksDictionnary: InformationDeskDictionnary;
  courses: OutdoorCourse[];
  outdoorPracticeDictionnary: OutdoorPracticeChoices;
  access: TrekResult[];
  outdoorPractice: OutdoorPracticeChoices;
  cityDictionnary: CityDictionnary;
  outdoorRating: OutdoorRatingChoices;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorSiteType: OutdoorSiteTypeChoices;
  sensitiveAreas: SensitiveArea[];
  signage: SignageDictionary | null;
  service: Service[] | null;
  infrastructure: InfrastructureDictionary | null;
}): OutdoorSiteDetails => ({
  ...adaptOutdoorSites({
    rawOutdoorSites: [
      { ...rawOutdoorSiteDetails.properties, geometry: rawOutdoorSiteDetails.geometry },
    ],
    themeDictionnary,
    outdoorPracticeDictionnary,
    cityDictionnary,
  })[0],
  accessibility: rawOutdoorSiteDetails.properties.accessibility ?? null,
  type: 'OUTDOOR_SITE',
  description: rawOutdoorSiteDetails.properties.description,
  ambiance: rawOutdoorSiteDetails.properties.ambiance,
  advice: rawOutdoorSiteDetails.properties.advice,
  descriptionTeaser: rawOutdoorSiteDetails.properties.description_teaser,
  bbox: {
    corner1: { x: rawOutdoorSiteDetails.bbox[0], y: rawOutdoorSiteDetails.bbox[1] },
    corner2: { x: rawOutdoorSiteDetails.bbox[2], y: rawOutdoorSiteDetails.bbox[3] },
  },
  labels:
    rawOutdoorSiteDetails?.properties?.labels?.map(labelId => labelsDictionnary[labelId]) ?? [],
  source:
    rawOutdoorSiteDetails?.properties?.source?.map(sourceId => sourcesDictionnary[sourceId]) ?? [],
  informationDesks:
    rawOutdoorSiteDetails?.properties?.information_desks?.map(
      deskId => informationDesksDictionnary[deskId],
    ) ?? [],
  webLinks: rawOutdoorSiteDetails?.properties?.web_links ?? null,
  pois,
  touristicContents,
  children,
  courses,
  id: rawOutdoorSiteDetails.id,
  access,
  pdfUri: rawOutdoorSiteDetails?.properties?.pdf || '',
  practice: outdoorPractice[String(rawOutdoorSiteDetails?.properties?.practice)],
  cities: rawOutdoorSiteDetails.properties.cities?.map(id => cityDictionnary[id]?.name) ?? [],
  cities_raw: rawOutdoorSiteDetails.properties.cities,
  ratings:
    rawOutdoorSiteDetails.properties.ratings?.map(r => {
      return {
        ...outdoorRating[String(r)],
        scale: outdoorRatingScale.find(oRS => oRS.id === outdoorRating[String(r)]?.scale),
      };
    }) ?? [],
  ratingsDescription: rawOutdoorSiteDetails.properties.ratings_description,
  typeSite: outdoorSiteType[Number(rawOutdoorSiteDetails?.properties?.type)],
  sensitiveAreas,
  signage,
  service,
  infrastructure,
});

export const adaptOutdoorSitePopupResults = ({
  rawOutdoorSitePopupResult,
  cityDictionnary,
}: {
  rawOutdoorSitePopupResult: RawOutdoorSiteDetails;
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
