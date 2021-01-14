interface ActivityBar {
  shouldDisplay: boolean;
}

interface Header {
  logo: string;
  structureName: string;
  menu: Menu;
}

interface MenuItem {
  name: string;
  url: string;
}

interface Menu {
  primaryItemsNumber: number;
  items: MenuItem[];
  supportedLanguage: string[];
}

interface PictureAndText {
  pictureUrl: string;
  shouldDisplayText: boolean;
}

export interface HomePageConfig {
  header: Header;
  pictureAndText: PictureAndText;
  activityBar: ActivityBar;
}
