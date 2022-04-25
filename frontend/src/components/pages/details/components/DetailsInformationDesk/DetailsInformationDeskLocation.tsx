import { Arrow } from 'components/Icons/Arrow';
import { FormattedMessage } from 'react-intl';
import { useDetailsAndMapContext } from '../../DetailsAndMapContext';

interface DetailsInformationDeskLocationProps {
  longitude: number;
  latitude: number;
}

export const DetailsInformationDeskLocation: React.FC<DetailsInformationDeskLocationProps> = ({
  latitude,
  longitude,
}) => {
  const { setMapCenter } = useDetailsAndMapContext();
  return (
    <div className="m-4 hidden desktop:block">
      <button
        className="flex items-center gap-2 shadow-sm p-2 px-4 rounded-full text-primary1 hover:bg-primary2 transition-colors"
        type="button"
        onClick={() => setMapCenter([latitude, longitude])}
      >
        <span>
          <FormattedMessage id="details.centerOnMap" />
        </span>
        <Arrow size={20} />
      </button>
    </div>
  );
};

export default DetailsInformationDeskLocation;
