import React from 'react';
import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';
import { AlertCircle } from 'components/Icons/AlertCircle';

export const MapReportButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <MapButton type="button" className={`m-auto flex gap-2  ${className}`} {...props}>
      <AlertCircle size={24} className="ml-1" />
      {children}
    </MapButton>
  );
};

const MapButton = styled.button`
  padding: ${getSpacing(3)};

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: ${borderRadius.roundButton};

  ${typography.main};
  color: ${colorPalette.primary1};

  background-color: ${colorPalette.white};

  transition-property: background-color bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: ${colorPalette.primary2};
  }
`;
