import { RawLineStringGeometry2D, RawPointGeometry2D, RawPolygonGeometry } from 'modules/interface';

export interface RawSensitiveArea {
  id: number;
  contact: string;
  description: string;
  elevation: string | null;
  geometry: RawPolygonGeometry | RawLineStringGeometry2D | RawPointGeometry2D;
  info_url: string;
  kml_url: string;
  name: string;
  period: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
  ];
  practices: number[];
  species_id: number;
  structure: string;
  url: string;
}

export interface SensitiveArea {
  name: string | null;
}
