import Link from 'components/Link';
import { generateResultDetailsUrl } from 'components/pages/search/utils';
import React from 'react';
import styled from 'styled-components';
import { colorPalette, MAX_WIDTH_MOBILE } from 'stylesheet';

const BreadcrumbElem = styled.div`
  display: flex;
`;
const StyledLink = styled(Link)`
  display: flex;
  color: ${colorPalette.primary1};

  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  display: flex;
  font-size: 14px;

  margin-bottom: 1rem;
  margin-top: 0.5rem;

  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    margin-bottom: 4rem;
    margin-top: 2rem;
  }
`;

const Separator = styled.div`
  margin: 0 0.5rem;
`;

const Breadcrumb: React.FC<{ breadcrumb: { label: string; link?: string }[] }> = ({
  breadcrumb,
}) => {
  return (
    <Wrapper>
      {breadcrumb.map(({ label, link }, i) => {
        const separator = i === 0 ? '>>' : '>';
        return link ? (
          <>
            <Separator>{separator}</Separator>
            <StyledLink href={link} className="underline">
              {label}
            </StyledLink>
          </>
        ) : (
          <BreadcrumbElem>
            <Separator>{separator}</Separator>
            {label}
          </BreadcrumbElem>
        );
      })}
    </Wrapper>
  );
};

export default Breadcrumb;
