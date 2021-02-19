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

export interface PortalLink {
  label: string;
  url: string;
}

export interface FooterConfig {
  socialNetworks?: SocialNetwork[];
  links?: PortalLink[];
  contact?: Partial<PortalContact>;
}
