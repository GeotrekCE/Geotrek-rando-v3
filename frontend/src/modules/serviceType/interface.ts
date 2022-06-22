export interface ServiceType {
  id: number;
  name: string;
  pictogram: string;
}

export interface ServiceTypeDictionary {
  [id: number]: ServiceType;
}
