import { marginDetailsChild } from 'components/pages/details/Details';
import { generateOutdoorCourseUrl } from 'components/pages/details/utils';
import { Separator } from 'components/Separator';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import React from 'react';
import styled, { css } from 'styled-components';
import { desktopOnly, scrollBar, sizes } from 'stylesheet';
import { OutdoorCourse } from '../../../../../modules/outdoorCourse/interface';

interface DetailsChildrenSectionProps {
  outdoorChildren: OutdoorCourse[];
  title: string;
  id: string;
}

export const OutdoorCoursesChildrenSection: React.FC<DetailsChildrenSectionProps> = ({
  outdoorChildren,
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
        className="flex desktop:flex-col items-stretch
        overflow-x-scroll desktop:overflow-x-hidden
        overflow-y-hidden desktop:overflow-y-scroll flex-nowrap
        pb-5 mt-4 mb-2 desktop:mb-0
        px-4 desktop:pl-18 desktop:pr-9 desktop:mr-9"
      >
        {outdoorChildren.map(trekChild => (
          <div key={trekChild.id} className={`mb-6 mx-1`}>
            <ResultCard
              id={`${trekChild.id}`}
              hoverId={trekChild.id}
              type="OUTDOOR_COURSE"
              place={''}
              title={trekChild.name}
              tags={[]}
              thumbnailUris={trekChild.thumbnailUris}
              attachments={trekChild.attachments}
              informations={{
                duration: trekChild.duration,
                maxElevation: trekChild.maxElevation,
                height: trekChild.height,
                length: trekChild.length,
              }}
              redirectionUrl={generateOutdoorCourseUrl(trekChild.id, trekChild.name)}
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
