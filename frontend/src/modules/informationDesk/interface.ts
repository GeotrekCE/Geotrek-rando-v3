import { InformationDeskType } from 'modules/informationDeskType/interface';

export interface RawInformationDesk {
  name: string;
  street: string;
  postal_code: string;
  municipality: string;
  website: string;
  phone: string;
  description: string;
  type: number;
}

export interface InformationDesk {
  name: string;
  street: string;
  postalCode: string;
  municipality: string;
  website: string;
  phone: string;
  description: string;
  type: InformationDeskType;
}

export interface InformationDeskDictionnary {
  [id: string]: InformationDesk;
}
