import React from 'react';
import { WebLink } from '../../modules/details/interface';

interface Props {
  link: WebLink;
}

const MoreLink: React.FC<Props> = ({ link }) => {
  return (
    <a href={link.url} target={'_blank'} rel="noreferrer noopener">
      <div className={'flex items-center'}>
        {link.category?.pictogram !== undefined ? (
          <div>
            <img src={link.category.pictogram} alt="" />
          </div>
        ) : (
          <div className="ml-8 mt-8" />
        )}
        <div className={'ml-2'}>{link.name}</div>
      </div>
    </a>
  );
};

export default MoreLink;
