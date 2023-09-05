import { cn } from 'services/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'py-1 px-2 rounded-full text-primary3 bg-primary2 text-sm desktop:text-base',
        className,
      )}
    >
      <span>{children}</span>
    </div>
  );
};
