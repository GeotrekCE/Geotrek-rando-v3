export interface ServiceType {
  id: number;
  name: string;
  pictogram: string | null;
}

export interface ServiceTypeDictionary {
  [id: number]: ServiceType;
}
