interface RawActivity {
  id: number;

  order: null;
  pictogram: string;
}

export interface RawUniqueActivity extends RawActivity {
  name: string;
}

export interface RawListActivity extends RawActivity {
  name: { [languageKey: string]: string | null };
}

export interface Activity {
  id: number;
  order: null;
  pictogram: string;
  name: string;
}
