import React from 'react';
import { AlertTriangle } from 'components/Icons/AlertTriangle';

export interface VigilanceAreaBadgeProps {
  typePictogramUrl?: string | null;
  levelPictogramUrl?: string | null;
  pictogramUrl?: string | null;
  levelMode?: 'closed' | 'alert' | 'vigilance' | 'info';
  size?: number;
  className?: string;
  isImpracticable?: boolean;
}

export const VigilanceAreaBadge: React.FC<VigilanceAreaBadgeProps> = ({
  typePictogramUrl,
  levelPictogramUrl,
  pictogramUrl,
  levelMode,
  size = 32,
  className = '',
  isImpracticable,
}) => {
  // Priority 1: Type pictogram from API
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

  // Priority 2: Level pictogram from API
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

  // Priority 3: Default icon
  const isImpracticableState = Boolean(isImpracticable || levelMode === 'closed');
  if (isImpracticableState) {
    return (
      <AlertTriangle
        color="var(--color-vigilance-closed, #901A1A)"
        size={size}
        className={`shrink-0 ${className}`}
        aria-hidden
      />
    );
  }

  // Default for practicable: exclamation icon in orange #d17a00
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
