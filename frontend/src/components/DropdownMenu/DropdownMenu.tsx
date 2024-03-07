import { SyntheticEvent, useId, useState } from 'react';
import { cn } from 'services/utils/cn';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  wrapperClassName?: string;
  expandedClassName?: string;
  href?: string;
  activeID?: string | null;
  setActiveID?: (id: string | null) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  className,
  contentClassName,
  wrapperClassName,
  expandedClassName,
  activeID,
  setActiveID,
  ...props
}) => {
  const TriggerTag = props.href ? 'a' : 'button';
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setExpanded(prevOpen => !prevOpen);
    setActiveID?.(activeID === id ? null : id);
  };

  const open = activeID !== undefined ? activeID === id : expanded;

  return (
    <div className={wrapperClassName}>
      <TriggerTag
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={id}
        onClick={handleClick}
        {...(props.href && {
          role: 'button',
        })}
        className={cn(className, open && expandedClassName)}
        {...props}
      >
        {trigger}
      </TriggerTag>
      <div id={id} className={contentClassName} hidden={!open}>
        {children}
      </div>
    </div>
  );
};
