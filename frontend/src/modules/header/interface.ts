interface MenuItem {
  translationId: string;
  url: string;
}

export interface MenuConfig {
  primaryItemsNumber: number;
  items: MenuItem[];
  shouldDisplayFavorite: boolean;
  supportedLanguages: string[];
}

export interface HeaderConfig {
  logo: string;
  menu: MenuConfig;
}
