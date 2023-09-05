import { Filter } from 'components/Icons/Filter';
import { ControlPosition } from 'leaflet';
import { cn } from 'services/utils/cn';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Control from '../CustomControl';

interface Props {
  openFilterMenu?: () => void;
  position?: ControlPosition;
}

export const FilterButton: React.FC<Props> = ({
  openFilterMenu = () => null,
  position = 'topright',
}) => {
  const { query = {} } = useRouter();
  const hasFilters = Object.keys(query).length > 0;
  return (
    <Control position={position}>
      <button
        type="button"
        onClick={openFilterMenu}
        className={cn(
          'rounded-full p-2 shadow-md  flex justify-center items-center text-greyDarkColored desktop:hidden',
          hasFilters ? 'bg-primary1' : 'bg-white',
        )}
      >
        <Filter size={24} className={hasFilters ? 'text-white' : 'text-primary1'} />
        <span className="sr-only">
          <FormattedMessage id="search.filter" />
        </span>
      </button>
    </Control>
  );
};
