interface ActivityBar {
  shouldDisplay: boolean;
  numberOfItemsBeforeTruncation: number;
}

interface WelcomeBanner {
  videoUrl?: string;
  carouselUrls?: string[];
  pictureUrl?: string;
  shouldDisplayText: boolean;
}

interface SuggestionsWithIds {
  ids: string[];
  type: 'trek' | 'service' | 'outdoor' | 'events';
}

interface SuggestionsWithList {
  numberOfItemsToDisplay?: number;
  type: 'upcomingEvents';
}

export type Suggestion = {
  iconUrl: string;
  titleTranslationId: string;
} & (SuggestionsWithIds | SuggestionsWithList);

/** @deprecated since 3.9.1 version */
export type DeprecatedSuggestionList = Array<Suggestion>;

export interface SuggestionList {
  [language: 'default' | string]: Suggestion[];
}

export interface HomePageConfig {
  welcomeBanner: WelcomeBanner;
  activityBar: ActivityBar;
  suggestions: Suggestion[];
}
