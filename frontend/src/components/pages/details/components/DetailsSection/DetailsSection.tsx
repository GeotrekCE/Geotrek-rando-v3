import { Separator } from 'components/Separator';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { scrollBar } from 'stylesheet';

export interface DetailsSectionProps {
  titleId?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({
  titleId,
  children,
  className,
  id,
}) => {
  return (
    <div className={className} id={id}>
      <ScrollContainer
        id="details_section"
        className={`flex flex-col
          pt-6 desktop:pt-12
          pb-3 desktop:pb-6
          mb-3 desktop:mb-6
          `}
      >
        {titleId !== undefined && (
          <p className="text-Mobile-H1 desktop:text-H2 font-bold" id="details_sectionTitle">
            <FormattedMessage id={titleId} />
          </p>
        )}
        <div
          id="details_sectionContent"
          className="mt-3 desktop:mt-4
          text-Mobile-C1 desktop:text-P1"
        >
          {children}
        </div>
      </ScrollContainer>
      <Separator />
    </div>
  );
};

const ScrollContainer = styled.div`
  &::-webkit-scrollbar {
    ${scrollBar.root}
  }
  &::-webkit-scrollbar-thumb {
    ${scrollBar.thumb}
  }
  max-width: 100%;
  overflow-x: auto;
`;
