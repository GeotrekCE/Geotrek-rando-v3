import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

import { colorPalette } from 'stylesheet';
import { Link } from 'components/Link';

interface Props {
  iconUrl: string;
  href: string;
  label: string;
}

export const ActivityButton: React.FC<Props> = ({ iconUrl, href, label }) => {
  return (
    <Link href={href}>
      <span className="flex flex-col items-center mt-6 text-greyDarkColored bg-white transition-colors hover:text-primary3">
        <FilledSvg src={iconUrl} className="h-9 desktop:w-12" />
        <span className="w-20 text-sm text-center text-greyDarkColored mt-2 text-ellipsis overflow-hidden">
          {label}
        </span>
      </span>
    </Link>
  );
};

const FilledSvg = styled(SVG)`
  & * {
    fill: ${colorPalette.home.activity.color} !important;
  }
`;
