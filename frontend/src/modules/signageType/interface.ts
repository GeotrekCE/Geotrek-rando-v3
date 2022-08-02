export interface SignageType {
  id: number;
  label: string;
  pictogram: string | null;
}

export interface SignageTypeDictionary {
  [id: number]: SignageType;
}
