export interface RawInformationDeskType {
  id: number;
  pictogram: string;
  label: string;
}

export interface InformationDeskType {
  label: string;
  pictogramUri: string;
}

export interface InformationDeskTypeDictionnary {
  [id: number]: InformationDeskType;
}
