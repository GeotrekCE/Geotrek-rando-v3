import { RawAttachment } from 'modules/interface';

export interface RawTrekPopupResult {
  name: string;
  departure: string;
  attachments: RawAttachment[];
}

export interface PopupResult {
  title: string;
  place: string;
  imgUrl: string;
  button?: {
    label: string;
    onClick?: () => void;
  };
}
