interface ActivityBar {
  shouldDisplay: boolean;
}

interface PictureAndText {
  pictureUrl: string;
  shouldDisplayText: boolean;
}

export interface HomePageConfig {
  pictureAndText: PictureAndText;
  activityBar: ActivityBar;
}
