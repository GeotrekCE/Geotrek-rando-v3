import { Thumbnail } from 'modules/results/interface';
import { Activity } from 'modules/activities/interface';
import { Difficulty } from 'modules/filters/difficulties/interface';

export interface RawDetails {
  name: string;
  departure: string;
  thumbnail: Thumbnail;
  practice: number;
  public_transport: string;
  access: string;
  advised_parking: string;
  description_teaser: string;
  ambiance: string;
  themes: number[];
  difficulty: number | null;
  duration: number | null;
  length_2d: number;
  ascent: number;
}

// Fields parsed with react-html-parser in page
export interface DetailsHtml {
  transport: string;
  access_parking: string;
  description_teaser: string;
  description: string;
}

export interface DetailsInformation {
  duration: string | null;
  distance: string;
  elevation: string;
  difficulty: Difficulty | null;
}
export interface Details extends DetailsHtml {
  practice: Activity;
  title: string;
  place: string;
  imgUrl: string;
  tags: string[];
  informations: DetailsInformation;
}
