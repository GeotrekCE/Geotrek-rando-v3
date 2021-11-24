export interface MenuItem {
  id: number;
  title: string;
  url: string;
  order: number | null;
}

export interface OrderableMenuItem {
  id: number;
  title: string;
  url: string;
  order: number;
}
export interface MenuConfig {
  primaryItemsNumber: number;
  shouldDisplayFavorite: boolean;
  supportedLanguages: string[];
  defaultLanguage: string;
}

export interface HeaderConfig {
  logo: string;
  menu: MenuConfig;
}
