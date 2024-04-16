import { Separator } from 'components/Separator';
import { TrekResult } from 'modules/results/interface';
import { TrekResultWithGeometryChild } from 'modules/details/interface';
import { OutdoorSiteResult } from 'modules/outdoorSite/interface';
import { OutdoorCourseResult } from 'modules/outdoorCourse/interface';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import styled, { css } from 'styled-components';
import { desktopOnly, scrollBar, sizes } from 'stylesheet';
import { cn } from 'services/utils/cn';
import { marginDetailsChild } from '../../Details';
import { generateDetailsUrlFromType } from '../../utils';

interface DetailsChildrenSectionProps {
  id?: string;
  items: TrekResult[] | TrekResultWithGeometryChild[] | OutdoorSiteResult[] | OutdoorCourseResult[];
  parentId?: string;
  title: string;
  type: 'TREK' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE';
}

export const DetailsChildrenSection: React.FC<DetailsChildrenSectionProps> = ({
  items,
  title,
  parentId,
  type,
  id = `${type.toLocaleLowerCase()}Children`,
}) => {
  const withSteps = parentId !== undefined;
  const idAttribute = `details_${id}`;
  return (
    <div className="pt-6 desktop:pt-12 scroll-mt-20 desktop:scroll-mt-30" id={idAttribute}>
      <h2
        id={`${idAttribute}Title`}
        className={cn(`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild}`)}
      >
        {title}
      </h2>
      <ScrollContainer
        id={`${idAttribute}ScrollContainer`}
        className={cn(
          `
          flex desktop:flex-col flex-nowrap items-stretch
          my-4 px-4
          desktop:mr-9 desktop:mb-0 desktop:pt-10 desktop:pr-9 desktop:pl-18
          overflow-x-auto desktop:overflow-x-hidden
          overflow-y-hidden desktop:overflow-y-auto
          scroll-smooth snap-x
          `,
          withSteps && '[counter-reset:steps]',
        )}
        as={withSteps ? 'ol' : 'ul'}
      >
        {items.map(item => (
          <li
            className={cn(
              'pb-6 mx-1',
              withSteps &&
                `
                flex
                relative
                desktop:ml-6
                [counter-increment:steps]
                before:content-[counters(steps,'.')]
                before:hidden before:desktop:block
                before:relative
                before:z-10
                before:mt-8
                before:mb-auto
                before:-ml-6
                before:mr-6
                before:py-2 before:px-4
                before:rounded-full
                before:border-solid before:border-primary1 before:border-3
                before:text-H4 before:font-bold before:text-primary1
                before:shadow-md
                before:bg-white
                after:content-['']
                after:hidden after:desktop:block
                after:w-1
                after:bg-primary1
                after:absolute
                after:top-0
                after:bottom-0
                after:-left-2p
                first:after:top-12
                last:after:h-8
                snap-center
              `,
            )}
            key={`${item.type}-${item.id}`}
          >
            <ResultCard
              id={`${item.id}`}
              hoverId={`${item.type}-${item.id}`}
              type={type}
              place={item.place}
              title={item.name}
              tags={item.tags}
              images={item.images}
              badgeIconUri={'category' in item ? item.category?.pictogramUri : undefined}
              badgeName={'category' in item ? item.category?.label : undefined}
              informations={item.informations}
              redirectionUrl={generateDetailsUrlFromType(
                item.type,
                item.id,
                item.name,
                withSteps ? { parentId } : undefined,
              )}
              className="w-60 desktop:w-auto"
            />
          </li>
        ))}
      </ScrollContainer>
      <div className={marginDetailsChild}>
        <Separator />
      </div>
    </div>
  );
};

const offsetTopForTitle = 130;

const ScrollContainer = styled.ul`
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
