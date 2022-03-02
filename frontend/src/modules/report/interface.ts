export interface Report {
  email: string;
  problem_magnitude: number;
  activity: number;
  category: number;
  geom: string | null;
  comment: string;
  related_trek: number;
}
