import { useState } from 'react';
import { useIntl } from 'react-intl';

export const useBurgerMenuSection = () => {
  const [openState, setOpenState] = useState<'OPENED' | 'CLOSED'>('CLOSED');

  const intl = useIntl();

  return {
    openState,
    setOpenState,
    intl,
  };
};
