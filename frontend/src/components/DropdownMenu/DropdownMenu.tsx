import Link from 'next/link';
import { FocusEventHandler, SyntheticEvent, useId, useState } from 'react';
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
  asHover?: boolean;
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
  asHover = false,
  href = null,
  ...props
}) => {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const handleMouseEnter = () => {
    setExpanded(true);
    setActiveID?.(id);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    setActiveID?.(null);
  };

  const handleFocusLeave: FocusEventHandler = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setExpanded(false);
      setActiveID?.(null);
    }
  };

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setExpanded(prevOpen => !prevOpen);
    setActiveID?.(activeID === id ? null : id);
  };

  const open = activeID !== undefined ? activeID === id : expanded;

  const triggerCommonProps = {
    ...(asHover
      ? {
          onMouseEnter: handleMouseEnter,
        }
      : {
          onClick: handleClick,
        }),
    'aria-expanded': open,
    'aria-controls': id,
    className: cn(className, open && expandedClassName),
  };

  return (
    <div
      className={wrapperClassName}
      {...(asHover === true && {
        onMouseLeave: handleMouseLeave,
        onFocus: handleMouseEnter,
        onBlur: handleFocusLeave,
      })}
    >
      {href ? (
        <Link role="button" href={href} {...triggerCommonProps} {...props}>
          {trigger}
        </Link>
      ) : (
        <button {...triggerCommonProps} {...props}>
          {trigger}
        </button>
      )}
      <div id={id} className={contentClassName} hidden={!open}>
        {children}
      </div>
    </div>
  );
};
