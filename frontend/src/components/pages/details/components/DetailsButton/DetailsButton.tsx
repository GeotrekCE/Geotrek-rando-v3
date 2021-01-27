import { Children } from 'react';

interface DetailsButtonProps {
  url: string;
  children: JSX.Element;
}

export const DetailsButton: React.FC<DetailsButtonProps> = ({ url, children }) => {
  return (
    <div
      className="h-12 w-12
      grid place-items-center
      rounded-full shadow-lg
      text-primary1 bg-white
      cursor-pointer
      hover:text-primary1-light transition-all"
    >
      {children}
    </div>
  );
};
