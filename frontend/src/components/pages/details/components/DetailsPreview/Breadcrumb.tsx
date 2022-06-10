import Link from 'components/Link';
import React from 'react';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: 14px;
`;

const Breadcrumb: React.FC<{ breadcrumb: { label: string; link?: string }[] }> = ({
  breadcrumb,
}) => {
  return (
    <div className="mt-2 mb-4 desktop:mt-8 desktop:mb-16 flex flex-wrap items-center text-Mobile-C2">
      {breadcrumb.map(({ label, link }, index) => {
        const separator = index === 0 ? '>>' : '>';
        return (
          <React.Fragment key={index}>
            <div className="mx-2">{separator}</div>
            {link !== undefined ? (
              <StyledLink href={link} className="hover:underline">
                {label}
              </StyledLink>
            ) : (
              label
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
