export interface Difficulty {
  label: string;
  pictogramUri: string;
}

export interface DifficultyChoices {
  [key: string]: Difficulty;
}
