export interface MenuItem {
  title: string;
  url: string;
  order: number;
}

export interface MenuConfig {
  primaryItemsNumber: number;
  shouldDisplayFavorite: boolean;
  supportedLanguages: string[];
}

export interface HeaderConfig {
  logo: string;
  menu: MenuConfig;
}
