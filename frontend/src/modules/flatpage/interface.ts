import { Source } from 'modules/source/interface';

export interface RawFlatPage {
  id: number;
  title: string;
  external_url: string | null;
  order: number | null;
}

export interface RawFlatPageDetails {
  id: number;
  title: string;
  content: string;
  source: number[];
}

export interface FlatPageDetails {
  id: number;
  title: string;
  content: string;
  sources: Source[];
  attachment: string;
}
