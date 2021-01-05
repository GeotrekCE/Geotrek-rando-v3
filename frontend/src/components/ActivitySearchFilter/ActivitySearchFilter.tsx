import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Walking } from '../Icons/Walking';

import { ActivityButton } from './ActivityButton';
import { ActivitySearchFilterContainer } from './ActivitySearchFilter.style';

export const ActivitySearchFilter: React.FC = () => {
  return (
    <ActivitySearchFilterContainer>
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
