import { Thumbnail } from '../results/interface';

export interface RawActivitySuggestion {
  name: string;
  thumbnail: Thumbnail;
}

export interface ActivitySuggestion {
  title: string;
  imgUrl: string;
}
