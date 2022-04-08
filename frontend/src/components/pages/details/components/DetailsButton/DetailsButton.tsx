import React from 'react';

interface DetailsButtonProps {
  url?: string;
  onClick?: (event: React.MouseEvent) => void;
  children: JSX.Element;
}

export const DetailsButton: React.FC<DetailsButtonProps> = ({ url, onClick, children }) => {
  const className =
    'h-12 w-12 grid place-items-center rounded-full shadow-lg text-primary1 bg-white cursor-pointer hover:text-primary1-light transition-all';

  if (url === undefined) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
  const linkProps = !url.startsWith('#')
    ? {
        target: '_blank',
        rel: 'noopener no referrer',
      }
    : {};
  return (
    <a href={url} onClick={onClick} className={className} {...linkProps}>
      {children}
    </a>
  );
};
