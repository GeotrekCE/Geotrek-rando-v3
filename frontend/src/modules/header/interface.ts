interface MenuItem {
  translationId: string;
  url: string;
}

interface Menu {
  primaryItemsNumber: number;
  items: MenuItem[];
  shouldDisplayFavorite: boolean;
  supportedLanguages: string[];
}

export interface HeaderConfig {
  logo: string;
  menu: Menu;
}
