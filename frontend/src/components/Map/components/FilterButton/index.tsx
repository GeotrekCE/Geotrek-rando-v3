import { Filter } from 'components/Icons/Filter';
import { MapButton } from '../MapButton';

interface Props {
  openFilterMenu: () => void;
  hasFilters: boolean;
}

export const FilterButton: React.FC<Props> = ({ openFilterMenu, hasFilters }) => {
  return (
    <MapButton
      className={`desktop:hidden left-auto right-8 ${hasFilters ? 'bg-primary1' : ''}`}
      icon={<Filter size={24} className={hasFilters ? 'text-white' : 'text-primary1'} />}
      onClick={openFilterMenu}
    />
  );
};
