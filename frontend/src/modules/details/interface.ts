import { Thumbnail } from 'modules/results/interface';
import { Activity } from 'modules/activities/interface';

export interface RawDetails {
  name: string;
  thumbnail: Thumbnail;
  practice: number;
}

export interface Details {
  title: string;
  imgUrl: string;
  practice: Activity;
}
