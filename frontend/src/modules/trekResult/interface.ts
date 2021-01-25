import { Thumbnail } from 'modules/results/interface';

export interface RawTrekPopupResult {
  name: string;
  departure: string;
  thumbnail: Thumbnail;
}

export interface TrekPopupResult {
  title: string;
  place: string;
  imgUrl: string;
}
