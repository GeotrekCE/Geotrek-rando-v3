export interface SignageType {
  id: number;
  label: string;
  pictogram: string;
}

export interface SignageTypeDictionary {
  [id: number]: SignageType;
}
