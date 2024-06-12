export interface Trek {
  id: number;
  access: string;
  accessibilities: number[];
  advice: string;
  advised_parking: string;
  altimetric_profile: string;
  ambiance: string | null;
  arrival: string;
  ascent: number;
  images: Attachment[];
  children: number[];
  create_datetime: string;
  departure: string;
  descent: number;
  description: string;
  description_teaser: string | null;
  difficulty: number;
  disabled_infrastructure: string;
  duration: number;
  elevation_area_url: string;
  elevation_svg_url: string;
  external_id: null;
  geometry: Geometry;
  gpx: string;
  information_desks: number[];
  kml: string;
  labels: number[];
  length_2d: number;
  length_3d: number;
  max_elevation: number;
  min_elevation: number;
  name: string;
  networks: number[];
  next: number;
  parents: number[];
  parking_location: number[];
  points_reference: null;
  portal: number[];
  practice: number;
  previous: number;
  public_transport: string;
  published: boolean;
  reservation_system: null;
  route: number;
  second_external_id: null;
  source: number[];
  structure: number;
  themes: number[];
  update_datetime: string;
  url: string;
}

export interface Attachment {
  author: string;
  backend: string;
  thumbnail: string;
  legend: string;
  title: string;
  url: string;
  type: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][];
}

export interface Thumbnail {
  author: string;
  title: string;
  legend: string;
  url: string;
}

export type TreksList = Trek[];
