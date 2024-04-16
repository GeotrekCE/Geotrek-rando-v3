import { ImageFromAttachment } from 'modules/interface';
import { Details } from '../details/interface';

type OfflinePicked = Pick<Details, 'title' | 'id' | 'place' | 'practice' | 'informations'>;
export interface Offline extends OfflinePicked {
  thumbnailUris: string[];
  attachments?: ImageFromAttachment[];
  images?: ImageFromAttachment[];
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
}
