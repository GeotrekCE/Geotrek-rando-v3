import { Thumbnail } from 'modules/results/interface';
import { Activity } from 'modules/activities/interface';

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
}

export interface DetailsString {
  title: string;
  place: string;
  imgUrl: string;
  transport: string;
  access_parking: string;
  description_teaser: string;
  description: string;
}
export interface Details extends DetailsString {
  practice: Activity;
}
