interface RawMenuLinkItem {
  target_type: 'link';
  link_url: string;
  page_title: null;
}

interface RawMenuPageItem {
  target_type: 'page';
  link_url: null;
  page_title: string;
}

interface RawMenuNullItem {
  target_type: null;
  link_url: null;
  page_title: null;
}

export type RawMenuItem = (RawMenuLinkItem | RawMenuPageItem | RawMenuNullItem) & {
  id: number;
  label: string;
  page: number;
  open_in_new_tab: boolean;
  pictogram: null | string;
  children?: RawMenuItem[];
};

export interface MenuItem {
  url: string | null;
  title: string;
  id: number;
  openInAnotherTab: boolean;
  pictogram: null | string;
  children?: MenuItem[];
}
