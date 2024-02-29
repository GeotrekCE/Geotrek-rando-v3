import { useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';
import { GenericIconProps } from 'components/Icons/types';
import Check from './Check';

export const Line: React.FC<{
  icon: React.FC<GenericIconProps>;
  active: boolean;
  toggle: () => void;
  transKey: string;
}> = ({ icon: Icon, active, toggle, transKey }) => {
  const intl = useIntl();
  return (
    <button
      className={cn(
        'flex items-center text-left font-bold',
        active ? 'text-primary1' : 'text-greyDarkColored',
      )}
      onClick={toggle}
      type="button"
    >
      <Icon className="w-6 h-6 mr-3" />
      <span className="flex-auto">{intl.formatMessage({ id: transKey })}</span>
      <Check visibility={active ? 'auto' : 'hidden'} />
    </button>
  );
};
