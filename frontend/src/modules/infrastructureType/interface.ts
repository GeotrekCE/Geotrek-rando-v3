export interface InfrastructureType {
  id: number;
  label: string;
  pictogram: string | null;
}

export interface InfrastructureTypeDictionary {
  [id: number]: InfrastructureType;
}
