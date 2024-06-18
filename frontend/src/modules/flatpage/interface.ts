import { ImageFromAttachment } from 'modules/interface';
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
  attachments: {
    author: string;
    backend: string;
    thumbnail: string;
    legend: string;
    title: string;
    url: string;
    type: string;
  }[];
}

export interface FlatPageDetails {
  id: number;
  title: string;
  content: string;
  sources: Source[];
  image: ImageFromAttachment | null;
  children?: FlatPageDetails[];
}
