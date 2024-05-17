import { ContentType, ImageFromAttachment } from 'modules/interface';
import { Details } from '../details/interface';

type OfflinePicked = Pick<Details, 'title' | 'id' | 'place' | 'practice' | 'informations'>;
export interface Offline extends OfflinePicked {
  thumbnailUris: string[];
  attachments?: ImageFromAttachment[];
  images?: ImageFromAttachment[];
  type: ContentType;
}
