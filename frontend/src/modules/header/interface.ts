export interface MenuItem {
  url: string | null;
  title: string;
  id: number;
  openInAnotherTab: boolean;
  children?: MenuItem[];
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
  headerTopHtml: {
    [key: string]: undefined | string;
    default: undefined | string;
  };
  headerBottomHtml: {
    [key: string]: undefined | string;
    default: undefined | string;
  };
}
