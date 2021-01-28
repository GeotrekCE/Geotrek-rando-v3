export interface RawAttachment {
  author: string;
  backend: string;
  thumbnail: string;
  legend: string;
  title: string;
  url: string;
  type: string;
}

export interface RawActivitySuggestion {
  name: string;
  attachments: RawAttachment[];
}

export interface ActivitySuggestion {
  title: string;
  imgUrl: string | null;
}
