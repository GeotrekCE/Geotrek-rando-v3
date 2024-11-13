import { FC, ReactNode, useId } from 'react';
import { cn } from 'services/utils/cn';

interface Props {
  children?: ReactNode;
  toolTipText?: string;
  color?: string;
  backgroundColor?: string;
  invertPosition?: boolean;
  role?: string;
  id?: string;
  className?: string;
}

const ToolTipGT: FC<Props> = ({
  children,
  toolTipText,
  invertPosition = false,
  role = 'tooltip',
  id,
  className = 'bg-primary1 text-primary2',
}) => {
  const uniqId = useId();
  return (
    <div role={role} aria-describedby={id} className="relative inline-block group">
      {children}
      <span
        id={id ?? uniqId}
        className={cn(
          'tooltipSpan',
          'relative absolute left-1/2 -translate-x-1/2 p-1.5 text-center rounded-md z-1',
          'w-0 hidden',
          'group-hover:w-max group-hover:inline',
          "after:content-[''] after:block after:absolute after:left-1/2 after:-ml-1 after:border-4 after:border-transparent",
          invertPosition
            ? 'top-full after:bottom-full after:border-b-primary1'
            : 'bottom-full after:-bottom-2 after:border-t-primary1',
          className,
        )}
      >
        {toolTipText}
      </span>
    </div>
  );
};

export default ToolTipGT;
