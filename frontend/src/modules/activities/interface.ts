export interface RawActivity {
  id: number;
  order: null;
  pictogram: string;
}

export interface RawUniqueActivity extends RawActivity {
  name: { [languageKey: string]: string | null };
}

export interface RawListActivity extends RawActivity {
  name: string;
}

export interface Activity {
  pictogram: string;
  name: string;
}

export interface ActivityChoices {
  [value: string]: Activity;
}

export interface ActivityFilter extends Activity {
  id: string;
  type: 'PRACTICE' | 'OUTDOOR_PRACTICE' | 'CATEGORY' | 'TOURISTIC_EVENT_TYPE';
}
