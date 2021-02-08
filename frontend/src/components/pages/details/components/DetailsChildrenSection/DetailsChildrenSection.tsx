import { Separator } from 'components/Separator';
import { TrekResult } from 'modules/results/interface';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import styled from 'styled-components';
import { colorPalette, getSpacing, sizes } from 'stylesheet';
import { Step } from '../DetailsDescription';
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
    <div className="mt-6 desktop:mt-12">
      <div className={`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild}`}>
        {title}
      </div>
      <ScrollContainer
        className="flex desktop:flex-col
        desktop:pl-18 desktop:pr-9 desktop:mr-9 desktop:pt-10
        mt-4 mb-4 desktop:mb-0 px-4 pb-2
        items-stretch
        overflow-scroll flex-nowrap max-h-screen
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
                  id={trekChild.id}
                  place={trekChild.place}
                  title={trekChild.title}
                  tags={trekChild.tags}
                  thumbnailUri={trekChild.thumbnailUri}
                  badgeIconUri={trekChild.practice.pictogram}
                  informations={trekChild.informations}
                  redirectionUrl={generateChildrenDetailsUrl(trekChild.id, trekChild.title, trekId)}
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
    width: ${getSpacing(2)};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colorPalette.greySoft};
    opacity: 0.5;
    border-radius: ${getSpacing(2)};
  }
  max-height: calc(
    100vh - ${sizes.desktopHeader + sizes.detailsHeaderDesktop + offsetTopForTitle}px
  );
`;
