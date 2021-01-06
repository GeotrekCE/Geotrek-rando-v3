import React from 'react';

import { ActivityButtonContainer, Text } from './ActivityButton.style';
import { GenericIconProps } from '../../Icons/types';

interface Props {
  icon: React.FC<GenericIconProps>;
  children: React.ReactNode;
}

export const ActivityButton: React.FC<Props> = ({ icon: Icon, children }) => {
  return (
    <ActivityButtonContainer>
      <Icon size={48} />
      <Text>{children}</Text>
    </ActivityButtonContainer>
  );
};
