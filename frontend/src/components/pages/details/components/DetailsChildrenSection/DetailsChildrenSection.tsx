import { Separator } from 'components/Separator';
import { TrekResult } from 'modules/results/interface';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import styled, { css } from 'styled-components';
import { desktopOnly, scrollBar, sizes } from 'stylesheet';
import { marginDetailsChild } from '../../Details';
import { generateChildrenDetailsUrl } from '../../utils';

interface DetailsChildrenSectionProps {
  trekChildren: TrekResult[];
  title: string;
  trekId: string;
}

export const DetailsChildrenSection: React.FC<DetailsChildrenSectionProps> = ({
  trekChildren,
  title,
  trekId,
}) => {
  return (
    <div className="mt-6 desktop:mt-12" id="details_trekChildren">
      <div
        id="details_trekChildrenTitle"
        className={`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild}`}
      >
        {title}
      </div>
      <ScrollContainer
        id="details_trekChildrenScrollContainer"
        className="flex desktop:flex-col
        desktop:pl-18 desktop:pr-9 desktop:mr-9 desktop:pt-10
        mt-4 mb-4 desktop:mb-0 px-4
        items-stretch
        overflow-x-scroll desktop:overflow-x-hidden
        overflow-y-hidden desktop:overflow-y-scroll
        flex-nowrap max-h-screen
        "
      >
        {trekChildren.map((trekChild, i) => (
          <div key={i}>
            <div className="hidden desktop:block">
              <Step number={i + 1} />
            </div>
            <div
              className={`mr-3 desktop:ml-5.5 desktop:mr-0 desktop:pl-12 relative ${
                i < trekChildren.length - 1
                  ? 'desktop:border-solid desktop:border-primary1 desktop:border-l-3'
                  : ''
              }`}
            >
              <div className="relative desktop:-top-20">
                <ResultCard
                  id={`${trekChild.id}`}
                  hoverId={`DETAILS-TREK_CHILDREN-${trekChild.id}`}
                  type="TREK"
                  place={trekChild.place}
                  title={trekChild.title}
                  tags={trekChild.tags || []}
                  thumbnailUris={trekChild.thumbnailUris}
                  attachments={trekChild.attachments}
                  badgeIconUri={trekChild.practice?.pictogram}
                  badgeName={trekChild.practice?.name}
                  informations={trekChild.informations}
                  redirectionUrl={generateChildrenDetailsUrl(trekChild.id, trekChild.title, trekId)}
                  className="w-60 desktop:w-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </ScrollContainer>
      <div className={marginDetailsChild}>
        <Separator />
      </div>
    </div>
  );
};

const offsetTopForTitle = 130;

const ScrollContainer = styled.div`
  &::-webkit-scrollbar {
    ${scrollBar.root}
  }
  &::-webkit-scrollbar-thumb {
    ${scrollBar.thumb}
  }
  ${desktopOnly(css`
    max-height: calc(
      100vh - ${sizes.desktopHeader + sizes.detailsHeaderDesktop + offsetTopForTitle}px
    );
  `)}
`;

const Step: React.FC<{ number: number }> = ({ number }) => (
  <div
    className="h-8 w-8 desktop:h-12 desktop:w-12
    rounded-full
    flex items-center justify-center
    border-solid border-primary1 border-3
    text-P1 desktop:text-H4 font-bold text-primary1
    shadow-md"
  >
    {number}
  </div>
);
