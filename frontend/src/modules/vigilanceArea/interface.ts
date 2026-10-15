import { FileFromAttachment, GeometryObject, RawAttachment, RawGeometryObject } from 'modules/interface';
import { VigilanceAreaType } from 'modules/vigilanceAreaType/interface';
import { VigilanceAreaLevel } from 'modules/vigilanceAreaLevel/interface';
import { Source } from 'modules/source/interface';

export interface RawVigilancePeriod {
  id?: number;
  start_date?: string | null;
  end_date?: string | null;
  active_days?: number[];
  annual?: boolean;
}

export interface VigilancePeriod {
  id?: number;
  startDate?: string | null;
  endDate?: string | null;
  activeDays: number[];
  annual: boolean;
}

export interface RawVigilanceArea {
  id: number;
  name: {
    [key: string]: string;
  } | string;
  geometry: RawGeometryObject;
  structure: number;
  vigilance_area_type: number;
  impracticable: boolean;
  description: {
    [key: string]: string;
  } | string;
  practical_info: {
    [key: string]: string;
  } | string;
  external_info_url: string | null;
  sources: number[];
  periods: RawVigilancePeriod[];
  published: boolean;
  uuid: string;
  attachments: RawAttachment[];
  update_datetime?: string;
  vigilance_level?: number | string | null;
}

export interface VigilanceArea {
  id: string;
  name: string;
  geometry: GeometryObject;
  type: VigilanceAreaType;
  level?: VigilanceAreaLevel | null;
  color?: string | null;
  isImpracticable: boolean;
  description?: string | null;
  practicalInfo?: string | null;
  externalInfoUrl?: string | null;
  periods: VigilancePeriod[];
  updateDatetime?: string | null;
  attachments?: FileFromAttachment[];
  criticality?: string | null;
  sources?: Source[];
}
