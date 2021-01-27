interface MenuItem {
  translationId: string;
  url: string;
}

interface Menu {
  primaryItemsNumber: number;
  items: MenuItem[];
  supportedLanguage: string[];
}

export interface HeaderConfig {
  logo: string;
  structureName: string;
  menu: Menu;
}
