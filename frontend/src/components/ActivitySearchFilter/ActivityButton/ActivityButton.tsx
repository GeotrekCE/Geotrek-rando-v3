import React from 'react';
import SVG from 'react-inlinesvg';

import { fillSvgWithColor } from 'stylesheet';
import { Link } from 'components/Link';

interface Props {
  iconUrl: string;
  href: string;
  label: string;
}

export const ActivityButton: React.FC<Props> = ({ iconUrl, href, label }) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-center mt-6 text-greyDarkColored bg-white transition hover:text-primary3 focus:text-primary3"
    >
      <SVG src={iconUrl} className="h-9 desktop:w-12" preProcessor={fillSvgWithColor()} />
      <span className="w-20 text-sm mt-2 text-ellipsis overflow-hidden">{label}</span>
    </Link>
  );
};
