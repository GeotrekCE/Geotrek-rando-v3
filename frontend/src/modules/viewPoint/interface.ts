import { FeatureCollection } from 'geojson';
import { RawPointGeometry2D } from 'modules/interface';

export interface RawViewPoint {
  annotations: FeatureCollection;
  id: number;
  author: string | null;
  legend: string | null;
  license: string | null;
  metadata_url: string;
  picture_tiles_url: string;
  title: string | null;
  thumbnail_url: string;
  geometry?: RawPointGeometry2D;
}

export interface RawViewPointCategories {
  id: string;
  name: string;
  pictogram: string;
}

export interface ViewPoint {
  annotations: FeatureCollection;
  id: string;
  author: string | null;
  legend: string | null;
  license: string | null;
  metadata: {
    levels: number;
    sizeX: number;
    sizeY: number;
    tileWidth: number;
    tileHeight: number;
  } | null;
  pictureTilesUrl: string;
  title: string | null;
  thumbnailUrl: string;
  geometry: RawPointGeometry2D | null;
}

export interface ViewPointCategory {
  id: string;
  name: string;
  pictogramUri: string;
}
export interface ViewPointCategories {
  [id: string]: ViewPointCategory;
}
