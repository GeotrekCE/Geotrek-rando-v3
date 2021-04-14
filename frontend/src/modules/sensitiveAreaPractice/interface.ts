export interface RawSensitiveAreaPractice {
  id: number;
  name: string;
}
export interface SensitiveAreaPractice {
  name: string;
}

export interface SensitiveAreaPracticeDictionnary {
  [id: number]: SensitiveAreaPractice;
}
