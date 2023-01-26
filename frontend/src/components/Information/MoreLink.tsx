import Image from 'next/image';
import React from 'react';
import { WebLink } from '../../modules/details/interface';

interface Props {
  link: WebLink;
}

const MoreLink: React.FC<Props> = ({ link }) => {
  return (
    <a href={link.url} target="_blank" rel="noreferrer noopener">
      <div className="flex items-center">
        {link.category?.pictogram !== undefined && (
          <Image
            loading="lazy"
            className="mr-2 w-auto"
            src={link.category.pictogram}
            alt=""
            width={30}
            height={30}
          />
        )}
        <span>{link.name}</span>
      </div>
    </a>
  );
};

export default MoreLink;
