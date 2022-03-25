import React from 'react';

import { GenericIconProps } from 'components/Icons/types';
import { Information } from '../BaseInformation';

export interface Props {
  icon: React.FC<GenericIconProps>;
  children: React.ReactNode;
  iconProps?: GenericIconProps;
  className?: string;
}

/**
 * Wraps BaseInformation and gives it an icon coming from our icons components (in our code so not customizable)
 */
export const LocalIconInformation: React.FC<Props> = ({ icon: Icon, iconProps, ...otherProps }) => {
  return <Information icon={<Icon size={24} {...iconProps} />} {...otherProps} />;
};
