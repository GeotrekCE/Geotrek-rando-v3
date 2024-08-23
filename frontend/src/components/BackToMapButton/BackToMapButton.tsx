import { useCallback } from 'react';
import { Map } from 'components/Icons/Map';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { ViewPoint } from 'components/Icons/ViewPoint';

export const BackToMapButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    displayMap?: () => void;
    setMapId?: (key: string) => void;
    mapId?: string;
  }
> = ({ displayMap, setMapId, mapId = 'default', ...nativeButtonProps }) => {
  const handleClick = useCallback(() => {
    displayMap?.();
    setMapId?.(mapId);
  }, [displayMap, mapId, setMapId]);

  return (
    <button
      id="backToMapButton"
      type="button"
      className={cn(
        `flex items-center fixed z-mapButton bottom-6 left-1/2 -translate-x-1/2
        py-3 px-4 gap-1
        shadow-sm rounded-full text-sm
        text-primary1 bg-white hover:bg-primary2 focus:bg-primary2 transition-all`,
      )}
      {...nativeButtonProps}
      onClick={handleClick}
    >
      <FormattedMessage id={mapId === 'default' ? 'search.seeMap' : 'search.seeViewPoint'} />
      {mapId === 'default' ? <Map size={24} aria-hidden /> : <ViewPoint size={24} aria-hidden />}
    </button>
  );
};
