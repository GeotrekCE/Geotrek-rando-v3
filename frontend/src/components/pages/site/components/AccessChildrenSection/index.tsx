import { marginDetailsChild } from 'components/pages/details/Details';
import { generateChildrenDetailsUrl, generateOutdoorSiteUrl } from 'components/pages/details/utils';
import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { Separator } from 'components/Separator';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import React from 'react';
import styled, { css } from 'styled-components';
import { desktopOnly, scrollBar, sizes } from 'stylesheet';
import { Details } from '../../../../../modules/details/interface';
import { OutdoorSite } from '../../../../../modules/outdoorSite/interface';
import { TrekResult } from '../../../../../modules/results/interface';

interface DetailsChildrenSectionProps {
  accessChildren: TrekResult[];
  title: string;
  id: string;
}

export const AccessChildrenSection: React.FC<DetailsChildrenSectionProps> = ({
  accessChildren,
  title,
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
        {accessChildren.map(trekChild => (
          <div key={trekChild.id} className={`mb-6`}>
            <ResultCard
              id={`${trekChild.id}`}
              hoverId={`DETAILS-TREK-${trekChild.id}`}
              type="TREK"
              place={''}
              title={trekChild.title}
              tags={trekChild.tags}
              thumbnailUris={trekChild.thumbnailUris}
              attachments={trekChild.attachments}
              badgeIconUri={trekChild.practice?.pictogram}
              informations={trekChild.informations}
              redirectionUrl={generateResultDetailsUrl(trekChild.id, trekChild.title)}
              className="w-60 desktop:w-auto"
            />
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
