export interface SocialNetwork {
  id: string;
  url: string;
}

export interface PortalContact {
  name: string;
  addressLine1: string;
  addressLine2: string;
  number: string;
  mail: string;
}

export interface PortalLinkStatic {
  label: string;
  url: string;
  openInAnotherTab: boolean;
}

interface PortalLinkDynamic {
  informationID: number;
}

export type PortalLink = PortalLinkStatic | PortalLinkDynamic;

export interface FooterConfigInput {
  socialNetworks?: SocialNetwork[];
  links?: PortalLink[];
  contact?: Partial<PortalContact>;
  footerTopHtml: {
    [key: string]: undefined | string;
    default: undefined | string;
  };
  footerBottomHtml: {
    [key: string]: undefined | string;
    default: undefined | string;
  };
}

export interface FooterConfigOutput {
  socialNetworks?: SocialNetwork[];
  links?: PortalLinkStatic[];
  contact?: Partial<PortalContact>;
  footerTopHtml: {
    [key: string]: undefined | string;
    default: undefined | string;
  };
  footerBottomHtml: {
    [key: string]: undefined | string;
    default: undefined | string;
  };
}
