export interface RawActivity {
  id: number;
  order: null | number;
  pictogram: string;
}

export interface RawUniqueActivity extends RawActivity {
  name: { [languageKey: string]: string | null };
}

export interface RawListActivity extends RawActivity {
  name: string;
}

export interface Activity {
  id: number | string;
  pictogramUri: string;
  label: string;
}

export interface ActivityChoices {
  [value: string]: Activity;
}

export interface ActivityFilter extends Activity {
  id: number | string;
  order: null | number;
  type: 'PRACTICE' | 'OUTDOOR_PRACTICE' | 'CATEGORY' | 'TOURISTIC_EVENT_TYPE';
  titleTranslationId?: string;
}
