import React from 'react';
import styled from 'styled-components';

import { buttonCssResets } from 'services/cssHelpers';
import { Cross } from 'components/Icons/Cross';

interface Props {
  closeMenu: () => void;
  className?: string;
}

export const CloseButton: React.FC<Props> = ({ closeMenu, className }) => {
  return (
    <Button type="button" onClick={closeMenu} className={className}>
      <Cross size={24} />
    </Button>
  );
};

const Button = styled.button`
  ${buttonCssResets};
`;
