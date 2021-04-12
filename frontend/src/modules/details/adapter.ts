import { Activity } from 'modules/activities/interface';
import { Choices } from 'modules/filters/interface';
import { getAttachments } from 'modules/utils/adapter';
import { dataUnits } from 'modules/results/adapter';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { formatDistance } from 'modules/results/utils';
import { CourseType } from 'modules/filters/courseType/interface';
import { NetworkDictionnary } from 'modules/networks/interface';
import { Poi } from 'modules/poi/interface';
import { TouristicContent } from 'modules/touristicContent/interface';
import { formatHours } from 'modules/utils/time';
import { CityDictionnary } from 'modules/city/interface';
import { AccessibilityDictionnary } from 'modules/accessibility/interface';
import { SourceDictionnary } from 'modules/source/interface';
import { InformationDeskDictionnary } from 'modules/informationDesk/interface';
import { LabelDictionnary } from 'modules/label/interface';
import { TrekResult } from 'modules/results/interface';
import { RawLineStringGeometry3D } from 'modules/interface';
import { Details, RawDetails, TrekChild, TrekChildGeometry } from './interface';

export const adaptResults = ({
  rawDetails: { properties: rawDetailsProperties, geometry, bbox },
  activity,
  difficulty,
  courseType,
  networks,
  themes,
  pois,
  touristicContents,
  cityDictionnary,
  accessibilityDictionnary,
  sourceDictionnary,
  informationDeskDictionnary,
  labelsDictionnary,
  children,
  childrenGeometry,
}: {
  rawDetails: RawDetails;
  activity: Activity;
  difficulty: Difficulty | null;
  courseType: CourseType | null;
  networks: NetworkDictionnary;
  themes: Choices;
  pois: Poi[];
  touristicContents: TouristicContent[];
  cityDictionnary: CityDictionnary;
  accessibilityDictionnary: AccessibilityDictionnary;
  sourceDictionnary: SourceDictionnary;
  informationDeskDictionnary: InformationDeskDictionnary;
  labelsDictionnary: LabelDictionnary;
  children: TrekResult[];
  childrenGeometry: TrekChildGeometry[];
}): Details => {
  try {
    return {
      title: rawDetailsProperties.name,
      place: cityDictionnary[rawDetailsProperties.departure_city].name,
      imgs: getAttachments(rawDetailsProperties.attachments),
      practice: activity,
      transport: rawDetailsProperties.public_transport,
      access: rawDetailsProperties.access,
      parking: rawDetailsProperties.advised_parking,
      description_teaser: rawDetailsProperties.description_teaser,
      ambiance: rawDetailsProperties.ambiance,
      description: rawDetailsProperties.description,
      tags: rawDetailsProperties.themes.map(themeId => themes[themeId].label),
      informations: {
        duration:
          rawDetailsProperties.duration !== null
            ? formatHours(rawDetailsProperties.duration)
            : null,
        distance: `${formatDistance(rawDetailsProperties.length_2d)}`,
        elevation: `+${rawDetailsProperties.ascent}${dataUnits.distance}`,
        networks: rawDetailsProperties.networks.map(networkId => networks[networkId]),
        difficulty,
        courseType,
      },
      pois,
      trekGeometry: geometry.coordinates.map(rawCoordinates => ({
        x: rawCoordinates[0],
        y: rawCoordinates[1],
      })),
      trekGeoJSON: `{"name":"letrek.geojson","type":"FeatureCollection","features":[{"type":"Feature","geometry":${JSON.stringify(
        geometry,
      )},"properties":null}]}`,
      trekDeparture: {
        x: geometry.coordinates[0][0],
        y: geometry.coordinates[0][1],
      },
      trekArrival: {
        x: geometry.coordinates[geometry.coordinates.length - 1][0],
        y: geometry.coordinates[geometry.coordinates.length - 1][1],
      },
      touristicContents,
      parkingLocation:
        rawDetailsProperties.parking_location !== null
          ? {
              x: rawDetailsProperties.parking_location[0],
              y: rawDetailsProperties.parking_location[1],
            }
          : null,
      pdfUri: rawDetailsProperties.pdf,
      gpxUri: rawDetailsProperties.gpx,
      kmlUri: rawDetailsProperties.kml,
      disabledInfrastructure: rawDetailsProperties.disabled_infrastructure,
      accessibilities:
        rawDetailsProperties.accessibilities !== undefined &&
        rawDetailsProperties.accessibilities !== null
          ? rawDetailsProperties.accessibilities.map(accessId => accessibilityDictionnary[accessId])
          : [],
      sources:
        rawDetailsProperties.source !== undefined && rawDetailsProperties.source !== null
          ? rawDetailsProperties.source.map(sourceId => sourceDictionnary[sourceId])
          : [],
      informationDesks:
        rawDetailsProperties.information_desks !== undefined &&
        rawDetailsProperties.information_desks !== null
          ? rawDetailsProperties.information_desks.map(deskId => informationDeskDictionnary[deskId])
          : [],
      labels:
        rawDetailsProperties.labels !== undefined && rawDetailsProperties.labels !== null
          ? rawDetailsProperties.labels.map(labelId => labelsDictionnary[labelId])
          : [],
      advice: rawDetailsProperties.advice,
      pointsReference:
        rawDetailsProperties.points_reference?.coordinates.map(rawCoordinates => ({
          x: rawCoordinates[0],
          y: rawCoordinates[1],
        })) ?? null,
      bbox: { corner1: { x: bbox[0], y: bbox[1] }, corner2: { x: bbox[2], y: bbox[3] } },
      children: children.map(child => ({
        ...child,
        geometry: childrenGeometry.find(childGeometry => childGeometry.id === `${child.id}`),
      })),
    };
  } catch (e) {
    console.error('Error in details/adapter', e);
    throw e;
  }
};

export const adaptChildren = ({
  childrenIds,
  childrenNames,
}: {
  childrenIds: string[];
  childrenNames: string[];
}): TrekFamily => ({
  trekChildren: childrenIds.map((childId, childIndex) => ({
    id: `${childId}`,
    name: childrenNames[childIndex],
    rank: childIndex + 1,
  })),
});

export const adaptTrekChildGeometry = (
  id: string,
  geometry: RawLineStringGeometry3D,
): TrekChildGeometry => ({
  id,
  departure: { x: geometry.coordinates[0][0], y: geometry.coordinates[0][1] },
});
