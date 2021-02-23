import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

import { colorPalette } from 'stylesheet';
import { Link } from 'components/Link';
import { ActivityButtonContainer, Text } from './ActivityButton.style';

interface Props {
  iconUrl: string;
  href: string;
  label: string;
}

export const ActivityButton: React.FC<Props> = ({ iconUrl, href, label }) => {
  return (
    <Link href={href}>
      <ActivityButtonContainer>
        <FilledSvg src={iconUrl} className="desktop:w-12" />
        <Text>{label}</Text>
      </ActivityButtonContainer>
    </Link>
  );
};

const FilledSvg = styled(SVG)`
  height: 36px;

  & * {
    fill: ${colorPalette.home.activity.color} !important;
  }
`;
