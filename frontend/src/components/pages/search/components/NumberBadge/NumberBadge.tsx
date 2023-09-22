import { cn } from 'services/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const NumberBadge: React.FC<Props> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'grid place-content-center rounded-full h-6 w-6 bg-primary1 text-white text-Mobile-C2 font-bold',
        className,
      )}
    >
      {children}
    </span>
  );
};
