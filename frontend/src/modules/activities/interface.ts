interface RawActivity {
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
  id: number;
  pictogram: string;
  name: string;
}

export interface ActivityChoices {
  [value: string]: {
    name: string;
    pictogram: string;
  };
}
