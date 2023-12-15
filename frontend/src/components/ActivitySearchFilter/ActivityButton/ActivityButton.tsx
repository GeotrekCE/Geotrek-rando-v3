import SVG from 'react-inlinesvg';
import getConfig from 'next/config';
import styled from 'styled-components';

import { optimizeAndDefineColor } from 'stylesheet';
import { Link } from 'components/Link';
import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { ActivityFilter } from 'modules/activities/interface';

interface Props {
  iconUrl: string;
  href: string;
  label: string;
  type: ActivityFilter['type'];
}

const {
  publicRuntimeConfig: { colors },
} = getConfig();

const getColor = (type: ActivityFilter['type']) => {
  if (type === 'PRACTICE') {
    return getActivityColor('practices');
  }
  if (type === 'OUTDOOR_PRACTICE') {
    return getActivityColor('outdoorPractice');
  }
  if (type === 'CATEGORY') {
    return getActivityColor('categories');
  }
  if (type === 'TOURISTIC_EVENT_TYPE') {
    return getActivityColor('event');
  }
  return colors.primary3;
};

export const ActivityButton: React.FC<Props> = ({ iconUrl, href, label, type }) => {
  return (
    <StyleLink
      $color={getColor(type)}
      href={href}
      className={`flex flex-col items-center text-center mt-6 text-greyDarkColored bg-white transition`}
    >
      <SVG src={iconUrl} className="h-9 desktop:w-12" preProcessor={optimizeAndDefineColor()} />
      <span className="w-20 text-sm mt-2 text-ellipsis overflow-hidden">{label}</span>
    </StyleLink>
  );
};

const StyleLink = styled(Link)<{ $color?: string }>`
  &:hover,
  &:focus {
    color: ${props => props.$color};
  }
`;
