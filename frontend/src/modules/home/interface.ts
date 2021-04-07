import { ActivitySuggestion } from 'modules/activitySuggestions/interface';

interface ActivityBar {
  shouldDisplay: boolean;
}

interface WelcomeBanner {
  pictureUrl: string;
  shouldDisplayText: boolean;
}

interface Suggestion {
  titleTranslationId: string;
  iconUrl: string;
  ids: string[];
}

export interface DisplayableSuggestionCategory {
  titleTranslationId: string;
  iconUrl: string;
  suggestions: ActivitySuggestion[];
}

export interface HomePageConfig {
  welcomeBanner: WelcomeBanner;
  activityBar: ActivityBar;
  suggestions: Suggestion[];
}
