import ImageWithLegend from 'components/ImageWithLegend';
import ArrowRight from 'components/Map/components/DetailsMapDrawer/ArrowRight';
import { ViewPoint } from 'modules/viewPoint/interface';
import { useCallback, useId, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { Minus } from 'components/Icons/Minus';
import { Plus } from 'components/Icons/Plus';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import { ViewPoint as ViewPointIcon } from 'components/Icons/ViewPoint';

interface DetailsViewPointsProps {
  className?: string;
  viewPoints: ViewPoint[];
  handleViewPointClick?: (key: string) => void;
  asAccordion?: boolean;
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const DetailsViewPoints: React.FC<DetailsViewPointsProps> = ({
  className,
  viewPoints,
  handleViewPointClick,
  asAccordion = false,
  titleTag: TitleTag = 'h2',
}) => {
  const SubTitleTag = TitleTag === 'h2' ? 'h3' : 'h4';

  const handleClick = useCallback(
    (viewPointId: string) => {
      handleViewPointClick?.(viewPointId);
    },
    [handleViewPointClick],
  );

  const id = useId();
  const [isOpen, setOpen] = useState(true);

  const { setHoveredCardId } = useListAndMapContext();

  if (viewPoints.length === 0) {
    return null;
  }

  return (
    <div className={cn(className, asAccordion && 'p-4 bg-neutral-100')}>
      <TitleTag
        className={cn(
          'relative flex items-center justify-stretch gap-1 font-bold',
          TitleTag === 'h2' ? 'text-Mobile-H1 desktop:text-H2' : 'text-Mobile-C1 desktop:text-H4',
        )}
      >
        <ViewPointIcon size={40} aria-hidden />
        <FormattedMessage id="viewPoint.title" />
        {asAccordion && (
          <button
            type="button"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls={id}
            className="ml-auto before:content-[''] before:absolute before:inset-0"
            onClick={() => setOpen(prevOpen => !prevOpen)}
          >
            {isOpen ? (
              <>
                <span className="sr-only">
                  <FormattedMessage id="accordion.close" />
                </span>
                <Minus size={24} aria-hidden />
              </>
            ) : (
              <>
                <span className="sr-only">
                  <FormattedMessage id="accordion.open" />
                </span>
                <Plus size={24} aria-hidden />
              </>
            )}
          </button>
        )}
      </TitleTag>
      <p className={cn('text-lg desktop:mt-6', !isOpen && 'hidden')}>
        <FormattedMessage id="viewPoint.description" />
      </p>
      <ul
        id={id}
        className={cn(
          'flex desktop:flex-col gap-4 bg-white text-Mobile-C1 desktop:text-P1 mt-4 pb-5 desktop:pb-0 overflow-x-auto desktop:overflow-x-hidden overflow-y-hidden desktop:overflow-y-auto scroll-smooth snap-x',
          !isOpen && 'hidden',
        )}
      >
        {viewPoints.map(viewPoint => {
          const legend = [viewPoint.legend, viewPoint.author].filter(Boolean).join(' - ');
          return (
            <li
              key={viewPoint.id}
              className="shrink-0 relative desktop:flex items-stretch border border-solid border-greySoft hover:border-blackSemiTransparent transition rounded-xl overflow-hidden row w-60 desktop:w-auto"
              onMouseEnter={() => {
                !asAccordion && setHoveredCardId(`DETAILS-VIEWPOINT-${viewPoint.id}`);
              }}
              onMouseLeave={() => {
                !asAccordion && setHoveredCardId(null);
              }}
            >
              <div className="relative shrink-0 w-full overflow-hidden h-resultCardDesktop desktop:w-resultCardDesktop">
                <ImageWithLegend
                  image={{
                    url: viewPoint.thumbnailUrl,
                    legend: '',
                    author: '',
                  }}
                />
              </div>
              <div className="desktop:flex flex-col items-start w-full p-4 desktop:p-6">
                <div className="grow">
                  <SubTitleTag className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold">
                    {viewPoint.title}
                  </SubTitleTag>
                  {legend.length > 0 && (
                    <p className="mt-4 text-greyDarkColored text-sm">
                      <FormattedMessage id="viewPoint.credit" /> {legend}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleClick(viewPoint.id)}
                  className={cn(`
                    flex justify-center items-center gap-2
                    mt-4 p-2 desktop:pl-4
                    rounded-xl desktop:rounded-full shadow-sm
                    text-greyDarkColored hover:bg-primary2 focus:bg-primary2 bg-white transition
                    before:content-[''] before:absolute before:inset-0
                    `)}
                >
                  <span className="text-greyDarkColored">
                    <FormattedMessage id="viewPoint.displayPicture" />
                  </span>
                  <ArrowRight aria-hidden />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
