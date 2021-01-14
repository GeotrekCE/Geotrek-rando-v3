import React from 'react';
import styled from 'styled-components';

import { buttonCssResets } from 'services/cssHelpers';

interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}

export const CloseButton: React.FC<Props> = ({ onClick, className, icon }) => {
  return (
    <Button type="button" onClick={onClick} className={className}>
      {icon}
    </Button>
  );
};

const Button = styled.button`
  ${buttonCssResets};
`;
