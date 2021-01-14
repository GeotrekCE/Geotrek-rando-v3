import React from 'react';
import { slide as Slide } from 'react-burger-menu';
import { useIntl } from 'react-intl';

import { CloseButton } from './CloseButton';

interface Props {
  menuState: 'DISPLAYED' | 'HIDDEN';
  handleClose: () => void;
  filterId: string | null;
  closeMenu: () => void;
}

export const MobileFilterSubMenu: React.FC<Props> = ({
  menuState,
  handleClose,
  closeMenu,
  filterId,
}) => {
  const intl = useIntl();
  return (
    /*
     * The library default behaviour is to have a fixed close icon which
     * made the icon overlap with the menu content as we scrolled.
     * To fix this issue we use our own close button which scrolls along
     * the content and imperatively closes the drawer.
     */
    <Slide
      isOpen={menuState === 'DISPLAYED'}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={false}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
    >
      <div className="relative text-center w-full pb-4 font-bold border-b border-solid border-greySoft outline-none">
        <CloseButton closeMenu={closeMenu} className="absolute left-0" />
        {filterId !== null && (
          <span>{intl.formatMessage({ id: `search.filters.${filterId}` })}</span>
        )}
      </div>
      {/* {filtersList.map(filter => null)} */}
    </Slide>
  );
};
