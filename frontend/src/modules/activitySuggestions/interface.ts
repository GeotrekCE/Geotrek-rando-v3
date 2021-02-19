import { RawAttachment } from 'modules/interface';

export interface RawActivitySuggestion {
  id: string;
  name: string;
  attachments: RawAttachment[];
}

export interface ActivitySuggestion {
  id: string;
  title: string;
  imgUrl: string | null;
}

export interface ActivitySuggestionDictionnary {
  [activitySuggestionId: string]: ActivitySuggestion;
}
