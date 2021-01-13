import { APIResponseForList } from 'services/api/interface';

export type RawTags = APIResponseForList<RawTag>;

export interface RawTag {
  id: number;
  advice: string;
  filter: boolean;
  name: string;
  pictogram: string | null;
}
