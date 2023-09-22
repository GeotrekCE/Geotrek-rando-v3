import { GenericIconProps } from 'components/Icons/types';
import { cn } from 'services/utils/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.FC<GenericIconProps>;
}

export const Button: React.FC<Props> = ({
  icon: Icon,
  children,
  className,
  ...nativeButtonsProps
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex gap-1 items-center py-2 px-4 h-12 border border-solid border-primary1 rounded-lg text-sm text-primary1 bg-white font-semibold transition transition-color hover:bg-primary2 focus:bg-primary2',
        className,
      )}
      {...nativeButtonsProps}
    >
      {Icon && <Icon aria-hidden size={24} />}
      {children}
    </button>
  );
};

export default Button;
