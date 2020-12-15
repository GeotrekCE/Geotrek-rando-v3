export const pushArgsFromLinkHref = <T extends string>(href: T): [T, T, { shallow: undefined }] => [
  href,
  href,
  { shallow: undefined },
];
