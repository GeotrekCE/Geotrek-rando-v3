import { InformationDeskType, RawInformationDeskType } from 'modules/informationDeskType/interface';

export interface RawInformationDesk {
  id: number;
  name: string;
  street: string;
  postal_code: string;
  municipality: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  type: RawInformationDeskType;
}

export interface InformationDesk {
  name: string;
  street: string;
  postalCode: string;
  municipality: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  type: InformationDeskType;
}

export interface InformationDeskDictionnary {
  [id: string]: InformationDesk;
}
