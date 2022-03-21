import { InformationDeskType, RawInformationDeskType } from 'modules/informationDeskType/interface';

export interface RawInformationDesk {
  accessibility: string;
  id: number;
  name: string;
  street: string;
  postal_code: string;
  municipality: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  photo_url: string;
  type: RawInformationDeskType;
  longitude: number;
  latitude: number;
}

export interface InformationDesk {
  accessibility: string;
  name: string;
  street: string;
  postalCode: string;
  municipality: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  photoUrl: string;
  type: InformationDeskType;
  longitude: number;
  latitude: number;
}

export interface InformationDeskDictionnary {
  [id: string]: InformationDesk;
}
