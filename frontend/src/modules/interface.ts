/** @deprecated please use RawCoordinate2D or RawCoordinate3D instead */
export type RawCoordinate = number[];

export type RawCoordinate2D = [number, number];

export type RawCoordinate3D = [number, number, number];

export interface RawLineStringGeometry2D {
  type: 'LineString';
  coordinates: RawCoordinate2D[];
}

export interface RawLineStringGeometry3D {
  type: 'LineString';
  coordinates: RawCoordinate3D[];
}
export interface RawMultiLineStringGeometry {
  type: 'MultiLineString';
  coordinates: RawCoordinate2D[][];
}

export interface RawMultiLineStringGeometry3D {
  type: 'MultiLineString';
  coordinates: RawCoordinate3D[][];
}

export interface RawPointGeometry2D {
  type: 'Point';
  coordinates: RawCoordinate2D;
}

export interface RawPointGeometry3D {
  type: 'Point';
  coordinates: RawCoordinate3D;
}

export interface RawMultiPointGeometry {
  type: 'MultiPoint';
  coordinates: RawCoordinate[];
}

export interface RawMultiPointGeometry2D {
  type: 'MultiPoint';
  coordinates: RawCoordinate2D[];
}

export interface RawPolygonGeometry {
  type: 'Polygon';
  coordinates: RawCoordinate2D[][];
}

export interface RawMultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: RawCoordinate2D[][][];
}

export type RawGeometryObject =
  | RawPolygonGeometry
  | RawMultiPolygonGeometry
  | RawLineStringGeometry2D
  | RawMultiLineStringGeometry
  | RawPointGeometry2D
  | RawMultiPointGeometry2D
  | RawGeometryCollection;

export interface RawGeometryCollection {
  type: 'GeometryCollection';
  geometries: Array<RawGeometryObject>;
}

export interface ColorsConfig {
  primary1?: { DEFAULT?: string; light?: string };
  primary2?: string;
  primary3?: string;
  greySoft?: { DEFAULT?: string; light?: string };
  warning?: string;
  easyOK?: string;
  hardKO?: string;
  red?: string;
  redMarker?: string;
}

export interface APICallsConfig {
  colors: ColorsConfig;
  searchResultsPageSize: number;
  mapResultsPageSize: number;
  maxPoiPerPage: number;
  maxTouristicContentPerPage: number;
  enableSensitiveAreas: boolean;
  enableOutdoor: boolean;
  enableTouristicEvents: boolean;
  portalIds: number[];
  apiUrl: string;
  googleAnalyticsId: string | null;
  googleSiteVerificationToken: string | null;
  baseUrl: string;
  fallbackImageUri: string;
  touristicContentLabelImageUri: string;
  applicationName: string;
  enableIndexation: boolean;
  enableReport: boolean;
  enableSearchByMap: boolean;
  enableServerCache: boolean;
  enableMeteoWidget: boolean;
  maxLengthTrekAllowedFor3DRando: number;
  reservationPartner: string;
  reservationProject: string;
  minAltitudeDifferenceToDisplayElevationProfile: number;
  accessibilityCodeNumber: string | null;
  groupTreksAndOutdoorFilters: boolean;
  hCaptchaKey: string | null;
  privacyPolicyLink: string | null;
}

/** @deprecated please use Coordinate2D or Coordinate3D instead */
export interface Coordinate {
  x: number;
  y: number;
  z: number;
}
export interface Coordinate2D {
  x: number;
  y: number;
}

export interface Coordinate3D extends Coordinate2D {
  z: number;
}

export interface RawAttachment {
  author: string;
  backend: string;
  thumbnail: string;
  legend: string;
  title: string;
  url: string;
  type: string;
  filetype: {
    id: number;
    type: string;
  };
}

interface Attachment {
  author: string;
  legend: string;
  url: string;
}

export interface ImageFromAttachment extends Attachment {}

export interface FileFromAttachment extends Attachment {
  fileName: string;
  fileType: string;
}

export interface LineStringGeometry {
  type: 'LineString';
  coordinates: Coordinate2D[];
}

export interface MultiLineStringGeometry {
  type: 'MultiLineString';
  coordinates: Coordinate2D[][];
}

export interface PointGeometry {
  type: 'Point';
  coordinates: Coordinate2D;
}

export interface MultiPointGeometry {
  type: 'MultiPoint';
  coordinates: Coordinate2D[];
}

export interface PolygonGeometry {
  type: 'Polygon';
  coordinates: Coordinate2D[][];
}

export interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: Coordinate2D[][][];
}

export type GeometryObject =
  | PolygonGeometry
  | MultiPolygonGeometry
  | LineStringGeometry
  | MultiLineStringGeometry
  | PointGeometry
  | MultiPointGeometry
  | GeometryCollection;

export interface GeometryCollection {
  type: 'GeometryCollection';
  geometries: Array<GeometryObject>;
}

export interface RawWebLink {
  name: string;
  url: string;
  category: {
    label: string;
    id: string;
    pictogram: string;
  };
}
