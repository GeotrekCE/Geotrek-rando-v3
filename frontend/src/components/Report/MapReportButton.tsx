import { AlertCircle } from 'components/Icons/AlertCircle';
import { cn } from 'services/utils/cn';

export const MapReportButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'm-auto flex gap-2 items-center p-3 shadow-sm text-primary1 bg-white hover:bg-primary2 focus:bg-primary2 transition rounded-2xl',
        className,
      )}
      {...props}
    >
      <AlertCircle size={24} aria-hidden />
      {children}
    </button>
  );
};
