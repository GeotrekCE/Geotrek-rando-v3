import React from 'react';
import { WarningImpracticable } from 'components/Icons/WarningImpracticable';

export interface VigilanceAreaBadgeProps {
  typePictogramUrl?: string | null;
  levelPictogramUrl?: string | null;
  pictogramUrl?: string | null;
  levelMode?: 'closed' | 'alert' | 'vigilance' | 'info';
  levelNumber?: number | null;
  size?: number;
  className?: string;
  isImpracticable?: boolean;
}

export const VigilanceAreaBadge: React.FC<VigilanceAreaBadgeProps> = ({
  typePictogramUrl,
  levelPictogramUrl,
  pictogramUrl,
  levelMode,
  levelNumber,
  size = 32,
  className = '',
  isImpracticable,
}) => {
  // Priority 1: Impracticable primes over EVERYTHING
  const isImpracticableState = Boolean(isImpracticable || levelMode === 'closed');
  if (isImpracticableState) {
    return (
      <WarningImpracticable
        size={size}
        className={`shrink-0 drop-shadow-sm ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Priority 2: Type pictogram from API
  const typePicto = typePictogramUrl ?? pictogramUrl;
  if (typePicto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typePicto}
        alt=""
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-contain shrink-0 bg-white rounded-full p-0.5 ${className}`}
      />
    );
  }

  // Priority 3: Custom level pictogram from API
  if (levelPictogramUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={levelPictogramUrl}
        alt=""
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-contain shrink-0 bg-white rounded-full p-0.5 ${className}`}
      />
    );
  }

  // Priority 3.5: Default icons for levels 1, 2, 3
  // Only Danger (Level 1) has a solid filled disc background for maximum visual impact
  const isLevel1 = levelNumber === 1 || levelMode === 'alert';
  if (isLevel1) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 drop-shadow-sm ${className}`}
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="18" fill="white" />
        <circle cx="18" cy="18" r="16.5" fill="#901A1A" />
        <path d="M18 9v11" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="18" cy="26" r="2" fill="white" />
      </svg>
    );
  }

  const isLevel3 = levelNumber === 3 || levelMode === 'info';
  if (isLevel3) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1257A8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${className}`}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="white" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    );
  }

  // Priority 4: Default fallback icon (outline exclamation mark in orange #d17a00, for Level 2 or zones without levels)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d17a00"
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
