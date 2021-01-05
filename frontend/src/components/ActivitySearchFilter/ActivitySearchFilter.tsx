import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Walking } from '../Icons/Walking';

import { ActivityButton } from './ActivityButton';
import { ActivitySearchFilterContainer } from './ActivitySearchFilter.style';

interface Props {
  className?: string;
}

export const ActivitySearchFilter: React.FC<Props> = ({ className }) => {
  return (
    <ActivitySearchFilterContainer className={className}>
      <ActivityButton icon={Walking}>
        <FormattedMessage id="home.walking" />
      </ActivityButton>
      <ActivityButton icon={Walking}>
        <FormattedMessage id="home.walking" />
      </ActivityButton>
      <ActivityButton icon={Walking}>
        <FormattedMessage id="home.walking" />
      </ActivityButton>
      <ActivityButton icon={Walking}>
        <FormattedMessage id="home.walking" />
      </ActivityButton>
      <ActivityButton icon={Walking}>
        <FormattedMessage id="home.walking" />
      </ActivityButton>
      <ActivityButton icon={Walking}>
        <FormattedMessage id="home.walking" />
      </ActivityButton>
    </ActivitySearchFilterContainer>
  );
};
