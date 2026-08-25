import React from 'react';

export interface VigilanceAreaBadgeProps {
  pictogramUrl?: string | null;
  levelMode?: 'closed' | 'alert' | 'vigilance' | 'info';
  size?: number;
  className?: string;
  isClosed?: boolean;
}

export const VigilanceAreaBadge: React.FC<VigilanceAreaBadgeProps> = ({
  pictogramUrl,
  levelMode,
  size = 32,
  className = '',
  isClosed,
}) => {
  const isClosedState = isClosed || levelMode === 'closed';

  if (pictogramUrl) {
    return (
      <img
        src={pictogramUrl}
        alt=""
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-contain shrink-0 bg-white rounded-full p-0.5 ${className}`}
      />
    );
  }

  if (isClosedState) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="18" fill="white" />
        <circle cx="18" cy="18" r="17" fill="var(--color-vigilance-closed, #901A1A)" />
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="var(--color-vigilance-closed, #901A1A)"
          stroke="white"
          strokeWidth="1.5"
        />
        <path d="M18 10v10" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="18" cy="25" r="1.75" fill="white" />
      </svg>
    );
  }

  if (levelMode === 'alert') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-vigilance-closed, #901A1A)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${className}`}
        aria-hidden="true"
      >
        <path
          d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
          fill="white"
        />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-vigilance-warning, #955a02)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="white" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};
