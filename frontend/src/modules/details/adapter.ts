import { AccessibilityDictionnary, AccessibilityLevel } from 'modules/accessibility/interface';
import { Activity } from 'modules/activities/interface';
import { CityDictionnary } from 'modules/city/interface';
import { CourseType } from 'modules/filters/courseType/interface';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { InformationDeskDictionnary } from 'modules/informationDesk/interface';
import {
  Coordinate2D,
  RawLineStringGeometry3D,
  RawMultiLineStringGeometry3D,
  RawPointGeometry3D,
} from 'modules/interface';
import { LabelDictionnary } from 'modules/label/interface';
import { NetworkDictionnary } from 'modules/networks/interface';
import { Poi } from 'modules/poi/interface';
import { dataUnits } from 'modules/results/adapter';
import { TrekResult } from 'modules/results/interface';
import { formatDistance } from 'modules/results/utils';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { Service } from 'modules/service/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { SourceDictionnary } from 'modules/source/interface';
import { TouristicContent } from 'modules/touristicContent/interface';
import { getLargeImagesOrThumbnailsFromAttachments } from 'modules/utils/adapter';
import {
  adaptGeometry2D,
  extractFirstPointOfGeometry,
  getTrekGeometryAsLineStringCoordinates,
} from 'modules/utils/geometry';
import { formatHours } from 'modules/utils/time';
import { ViewPoint } from 'modules/viewPoint/interface';
import { TrekRatingScale } from '../trekRatingScale/interface';
import { TrekRatingChoices } from '../trekRating/interface';
import { Details, RawDetails, Reservation, TrekChildGeometry, TrekFamily } from './interface';

export const adaptResults = ({
  accessbilityLevel,
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
  sensitiveAreas,
  signage,
  service,
  infrastructure,
  reservation,
  trekRating,
  trekRatingScale,
  viewPoints,
}: {
  accessbilityLevel: AccessibilityLevel | null;
  rawDetails: RawDetails;
  activity: Activity | null;
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
  sensitiveAreas: SensitiveArea[];
  signage: SignageDictionary | null;
  service: Service[] | null;
  infrastructure: InfrastructureDictionary | null;
  reservation: Reservation | null;
  trekRating: TrekRatingChoices;
  trekRatingScale: TrekRatingScale[];
  viewPoints: ViewPoint[];
}): Details => {
  try {
    const coordinates = getTrekGeometryAsLineStringCoordinates(geometry);
    return {
      accessbilityLevel,
      accessibility_signage: rawDetailsProperties.accessibility_signage ?? null,
      accessibility_slope: rawDetailsProperties.accessibility_slope ?? null,
      accessibility_width: rawDetailsProperties.accessibility_width ?? null,
      accessibility_advice: rawDetailsProperties.accessibility_advice ?? null,
      accessibility_covering: rawDetailsProperties.accessibility_covering ?? null,
      accessibility_exposure: rawDetailsProperties.accessibility_exposure ?? null,
      attachmentsAccessibility: rawDetailsProperties.attachments_accessibility ?? null,
      id: Number(rawDetailsProperties.id),
      title: rawDetailsProperties.name,
      place: cityDictionnary[rawDetailsProperties.departure_city]?.name ?? '',
      imgs: getLargeImagesOrThumbnailsFromAttachments(rawDetailsProperties.attachments, false),
      practice: activity,
      transport: rawDetailsProperties.public_transport,
      access: rawDetailsProperties.access,
      parking: rawDetailsProperties.advised_parking,
      description_teaser: rawDetailsProperties.description_teaser,
      ambiance: rawDetailsProperties.ambiance,
      description: rawDetailsProperties.description,
      tags: rawDetailsProperties.themes.map(themeId => themes[themeId]?.label).filter(Boolean),
      informations: {
        duration:
          rawDetailsProperties.duration !== null
            ? formatHours(rawDetailsProperties.duration)
            : null,
        distance: `${formatDistance(rawDetailsProperties.length_2d)}`,
        elevation: `+${rawDetailsProperties.ascent}${dataUnits.distance}`,
        negativeElevation: `${rawDetailsProperties.descent}${dataUnits.distance}`,
        networks: rawDetailsProperties.networks.map(networkId => networks[networkId]),
        difficulty,
        courseType,
      },
      pois,
      trekGeometry: coordinates.map(adaptGeometry2D),
      trekGeoJSON: `{"name":"letrek.geojson","type":"FeatureCollection","features":[{"type":"Feature","geometry":${JSON.stringify(
        geometry,
      )},"properties":null}]}`,
      trekDeparture: adaptGeometry2D(coordinates[0]),
      trekArrival: adaptGeometry2D(coordinates[coordinates.length - 1]),
      departure: rawDetailsProperties.departure,
      arrival: rawDetailsProperties.arrival,
      cities: rawDetailsProperties.cities
        .map(id => cityDictionnary[id]?.name ?? null)
        .filter(Boolean),
      cities_raw: rawDetailsProperties.cities,
      touristicContents,
      parkingLocation:
        rawDetailsProperties.parking_location !== null
          ? adaptGeometry2D(rawDetailsProperties.parking_location)
          : null,
      pdfUri: rawDetailsProperties.pdf,
      gpxUri: rawDetailsProperties.gpx,
      kmlUri: rawDetailsProperties.kml,
      disabledInfrastructure: rawDetailsProperties.disabled_infrastructure,
      accessibilities: Array.isArray(rawDetailsProperties.accessibilities)
        ? rawDetailsProperties.accessibilities.map(accessId => accessibilityDictionnary[accessId])
        : [],
      sources: Array.isArray(rawDetailsProperties.source)
        ? rawDetailsProperties.source.map(sourceId => sourceDictionnary[sourceId]).filter(Boolean)
        : [],
      informationDesks: Array.isArray(rawDetailsProperties.information_desks)
        ? rawDetailsProperties.information_desks
            .map(deskId => informationDeskDictionnary[deskId])
            .filter(Boolean)
        : [],
      labels: Array.isArray(rawDetailsProperties.labels)
        ? rawDetailsProperties.labels.map(labelId => labelsDictionnary[labelId]).filter(Boolean)
        : [],
      advice: rawDetailsProperties.advice,
      gear:
        rawDetailsProperties.gear !== undefined && rawDetailsProperties.gear !== ''
          ? rawDetailsProperties.gear
          : null,
      pointsReference:
        rawDetailsProperties.points_reference?.coordinates.map(rawCoordinates => ({
          x: rawCoordinates[0],
          y: rawCoordinates[1],
        })) ?? null,
      bbox: { corner1: { x: bbox[0], y: bbox[1] }, corner2: { x: bbox[2], y: bbox[3] } },
      children: children.map(child => ({
        ...child,
        childrenGeometries: childrenGeometry.find(
          childGeometry => childGeometry.id === `${child.id}`,
        ),
      })),
      sensitiveAreas,
      webLinks: rawDetailsProperties.web_links ?? null,
      elevationAreaUrl: rawDetailsProperties.elevation_area_url,
      altimetricProfileUrl: rawDetailsProperties.altimetric_profile,
      length2d: rawDetailsProperties.length_2d,
      reservation,
      reservation_id: rawDetailsProperties.reservation_id || null,
      ratings:
        rawDetailsProperties.ratings?.map(r => {
          return {
            ...trekRating[String(r)],
            scale: trekRatingScale.find(oRS => oRS.id === trekRating[String(r)]?.scale) ?? [],
          };
        }) ?? [],
      ratingsDescription: rawDetailsProperties.ratings_description ?? '',
      signage,
      service,
      infrastructure,
      viewPoints,
    };
  } catch (e) {
    console.error('Error in details/adapter', e);
    throw e;
  }
};

export const adaptChildren = ({
  childrenIds,
  childrenNames,
  parentName,
  parentId,
}: {
  childrenIds: string[];
  childrenNames: string[];
  parentName: string;
  parentId: string;
}): TrekFamily => ({
  parentId,
  parentName,
  trekChildren: childrenIds.map((childId, childIndex) => ({
    id: `${childId}`,
    name: childrenNames[childIndex],
    rank: childIndex + 1,
  })),
});

export const adaptTrekChildGeometry = (
  id: string,
  geometry: RawLineStringGeometry3D | RawMultiLineStringGeometry3D | RawPointGeometry3D,
): { id: string; departure: Coordinate2D } => {
  return {
    id,
    departure: extractFirstPointOfGeometry(geometry) as Coordinate2D,
  };
};
