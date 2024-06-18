import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';

interface ControlButtonProps {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ icon, className = '', ...props }) => {
  return (
    <button
      className={cn(
        'size-10 rounded-lg shadow-md z-mapButton bg-white text-greyDarkColored flex justify-center items-center mb-3',
        className,
      )}
      type="button"
      {...props}
    >
      {icon}
      <span className="sr-only">
        <FormattedMessage id={'search.map.panel.open'} />
      </span>
    </button>
  );
};
