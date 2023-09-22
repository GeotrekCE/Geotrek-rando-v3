import { ButtonHTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

import { Filter } from 'components/Icons/Filter';
import { NumberBadge } from '../NumberBadge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  numberSelected: number;
}

export const ToggleFilterButton: React.FC<Props> = ({ numberSelected, ...nativeButtonProps }) => {
  return (
    <button className="flex items-center text-primary1 desktop:hidden" {...nativeButtonProps}>
      {numberSelected === 0 ? (
        <Filter size={16} className="mr-2" />
      ) : (
        <NumberBadge className="mr-1">{numberSelected}</NumberBadge>
      )}
      <span className="ml-1 font-bold text-primary1">
        <FormattedMessage id="search.filter" />
      </span>
    </button>
  );
};
