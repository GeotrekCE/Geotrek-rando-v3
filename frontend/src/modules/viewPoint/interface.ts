import { FeatureCollection } from 'geojson';
import { PointGeometry } from 'modules/interface';

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
  geometry?: PointGeometry;
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
  geometry: PointGeometry | null;
}
