import React from 'react';
import { WebLink } from '../../modules/details/interface';

interface Props {
  link: WebLink;
}

const MoreLink: React.FC<Props> = ({ link }) => {
  return (
    <a href={link.url} target={'_blank'} rel="noreferrer">
      <div className={'flex items-center'}>
        <div>
          <img src={link.category.pictogram} />
        </div>
        <div className={'ml-2'}>{link.name}</div>
      </div>
    </a>
  );
};

export default MoreLink;
