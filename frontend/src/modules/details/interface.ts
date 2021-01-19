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
}

export interface Details {
  title: string;
  place: string;
  imgUrl: string;
  practice: Activity;
  transport: string;
  access_parking: string;
}
