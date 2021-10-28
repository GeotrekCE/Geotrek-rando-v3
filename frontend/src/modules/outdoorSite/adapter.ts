import { getAttachments, getThumbnail, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { Activity, ActivityChoices } from '../activities/interface';
import { Choices } from '../filters/interface';
import { InformationDeskDictionnary } from '../informationDesk/interface';
import { LabelDictionnary } from '../label/interface';
import { OutdoorCourse } from '../outdoorCourse/interface';
import { Poi } from '../poi/interface';
import { SourceDictionnary } from '../source/interface';
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
  activitiesDictionnary,
}: {
  rawOutdoorSites: RawOutdoorSite[];
  themeDictionnary: Choices;
  activitiesDictionnary: ActivityChoices;
}): OutdoorSite[] =>
  rawOutdoorSites.map(rawOutdoorSite => {
    return {
      id: rawOutdoorSite.id,
      type: 'OUTDOOR_SITE',
      name: rawOutdoorSite.name,
      thumbnailUris: getThumbnails(rawOutdoorSite.attachments),
      attachments: getAttachments(rawOutdoorSite.attachments),
      geometry: rawOutdoorSite.geometry
        ? adaptGeometry(rawOutdoorSite.geometry.geometries[0])
        : null,
      themes: rawOutdoorSite?.themes?.map(themeId => themeDictionnary[themeId].label) ?? [],
      practice: activitiesDictionnary[rawOutdoorSite.practice] ?? null,
      period: rawOutdoorSite?.period ? rawOutdoorSite?.period : null,
      wind: rawOutdoorSite?.wind ?? [],
      orientation: rawOutdoorSite?.orientation ?? [],
    };
  });

export const adaptOutdoorSiteDetails = ({
  rawOutdoorSiteDetails,
  activitiesDictionnary,
  pois,
  children,
  themeDictionnary,
  labelsDictionnary,
  sourcesDictionnary,
  informationDesksDictionnary,
  courses,
}: {
  rawOutdoorSiteDetails: RawOutdoorSiteDetails;
  pois: Poi[];
  children: OutdoorSite[];
  themeDictionnary: Choices;
  labelsDictionnary: LabelDictionnary;
  sourcesDictionnary: SourceDictionnary;
  informationDesksDictionnary: InformationDeskDictionnary;
  courses: OutdoorCourse[];
  activitiesDictionnary: ActivityChoices;
}): OutdoorSiteDetails => ({
  ...adaptOutdoorSites({
    rawOutdoorSites: [
      { ...rawOutdoorSiteDetails.properties, geometry: rawOutdoorSiteDetails.geometry },
    ],
    themeDictionnary,
    activitiesDictionnary,
  })[0],
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
  webLinks: rawOutdoorSiteDetails?.properties?.web_links,
  pois,
  children,
  courses,
  id: rawOutdoorSiteDetails.id,
});

export const adaptOutdoorSitePopupResults = (rawDetails: RawOutdoorSiteDetails): PopupResult => {
  return {
    title: rawDetails.properties.name,
    place: '',
    imgUrl: getThumbnail(rawDetails.properties.attachments) ?? fallbackImgUri,
  };
};
