import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const NumberBadge: React.FC<Props> = ({ children, className }) => {
  return (
    <Badge className={`h-6 w-6 bg-primary1 text-white text-Mobile-C2 font-bold ${className ?? ''}`}>
      {children}
    </Badge>
  );
};

const Badge = styled.div`
  border-radius: 50%;
  display: grid;
  place-items: center;
`;
