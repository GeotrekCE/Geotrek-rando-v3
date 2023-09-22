import { Map } from 'components/Icons/Map';
import { FormattedMessage } from 'react-intl';
import { useHideOnScrollDown } from 'hooks/useHideOnScrollDown';
import { Button } from 'components/Button';
import { cn } from 'services/utils/cn';

export const OpenMapButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { displayMap: () => void }
> = ({ displayMap, ...nativeButtonProps }) => {
  const buttonDisplayState = useHideOnScrollDown();

  return (
    <Button
      id="openMapButton"
      className={cn(
        'fixed z-floatingButton flex gap-1 desktop:hidden border-0 rounded-full shadow-md left-1/2 -translate-x-1/2 transition-all',
        buttonDisplayState === 'HIDDEN' ? '-bottom-25' : 'bottom-6',
      )}
      {...nativeButtonProps}
      onClick={displayMap}
    >
      <FormattedMessage id="search.seeMap" />
      <Map size={24} />
    </Button>
  );
};
