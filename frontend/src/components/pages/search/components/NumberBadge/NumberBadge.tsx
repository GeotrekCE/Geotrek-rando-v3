import { cn } from 'services/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const NumberBadge: React.FC<Props> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'grid place-content-center rounded-full size-6 bg-primary1 text-white text-Mobile-C2 font-bold',
        className,
      )}
    >
      {children}
    </span>
  );
};
