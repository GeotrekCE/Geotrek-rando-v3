export interface InfrastructureType {
  id: number;
  label: string;
  pictogram: string;
}

export interface InfrastructureTypeDictionary {
  [id: number]: InfrastructureType;
}
