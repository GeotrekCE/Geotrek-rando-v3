import { Filter } from 'components/Icons/Filter';
import { ControlPosition } from 'leaflet';
import Control from '../CustomControl';

interface Props {
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  position?: ControlPosition;
}

export const FilterButton: React.FC<Props> = ({
  openFilterMenu = () => null,
  hasFilters = false,
  position = 'topright',
}) => {
  return (
    <Control position={position}>
      <button
        type="button"
        onClick={openFilterMenu}
        className={`rounded-full p-2 shadow-md bg-white flex justify-center items-center text-greyDarkColored desktop:hidden ${
          hasFilters ? 'bg-primary1' : ''
        }`}
      >
        <Filter size={24} className={hasFilters ? 'text-white' : 'text-primary1'} />
      </button>
    </Control>
  );
};
