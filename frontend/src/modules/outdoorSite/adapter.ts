import { getAttachments, getThumbnail, getThumbnails } from 'modules/utils/adapter';
import { adaptGeometry } from 'modules/utils/geometry';
import { Activity, ActivityChoices } from '../activities/interface';
import { Choices } from '../filters/interface';
import { InformationDeskDictionnary } from '../informationDesk/interface';
import { LabelDictionnary } from '../label/interface';
import { OutdoorCourse } from '../outdoorCourse/interface';
import { OutdoorPracticeChoices } from '../outdoorPractice/interface';
import { Poi } from '../poi/interface';
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
}: {
  rawOutdoorSites: RawOutdoorSite[];
  themeDictionnary: Choices;
  outdoorPracticeDictionnary: OutdoorPracticeChoices;
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
      practice: outdoorPracticeDictionnary[rawOutdoorSite.practice] ?? null,
      period: rawOutdoorSite?.period ? rawOutdoorSite?.period : null,
      wind: rawOutdoorSite?.wind ?? [],
      orientation: rawOutdoorSite?.orientation ?? [],
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
}): OutdoorSiteDetails => ({
  ...adaptOutdoorSites({
    rawOutdoorSites: [
      { ...rawOutdoorSiteDetails.properties, geometry: rawOutdoorSiteDetails.geometry },
    ],
    themeDictionnary,
    outdoorPracticeDictionnary,
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
  touristicContents,
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
