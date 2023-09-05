import ImageWithLegend from 'components/ImageWithLegend';
import ArrowRight from 'components/Map/components/DetailsMapDrawer/ArrowRight';
import { ViewPoint } from 'modules/viewPoint/interface';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';

interface DetailsMediasProps {
  viewPoints: ViewPoint[];
  displayMap: () => void;
  setMapId: (key: string) => void;
}

export const DetailsMedias: React.FC<DetailsMediasProps> = ({
  viewPoints,
  displayMap,
  setMapId,
}) => {
  const handleClick = useCallback(
    (id: string) => {
      displayMap();
      setMapId(id);
    },
    [displayMap, setMapId],
  );

  return (
    <div>
      <h2 className="text-Mobile-H1 desktop:text-H2 font-bold">
        <FormattedMessage id="viewPoint.title" />
      </h2>
      <ul className="flex desktop:flex-col gap-4 text-Mobile-C1 desktop:text-P1 mt-4 desktop:mt-8 pb-5 desktop:pb-0 overflow-x-auto desktop:overflow-x-hidden overflow-y-hidden desktop:overflow-y-auto scroll-smooth snap-x">
        {viewPoints.map(viewPoint => {
          const legend = [viewPoint.legend, viewPoint.author].filter(Boolean).join(' - ');
          return (
            <li
              key={viewPoint.id}
              className="shrink-0 relative desktop:flex items-stretch border border-solid border-greySoft hover:border-blackSemiTransparent transition rounded-xl overflow-hidden row w-60 desktop:w-auto"
            >
              <div className="relative shrink-0 w-full overflow-hidden h-resultCardDesktop desktop:w-resultCardDesktop">
                <ImageWithLegend
                  attachment={{
                    url: viewPoint.thumbnailUrl,
                    legend: '',
                    author: '',
                  }}
                />
              </div>
              <div className="desktop:flex flex-col items-start w-full p-4 desktop:p-6">
                <div className="grow">
                  <h3 className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold">
                    {viewPoint.title}
                  </h3>
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
                    <FormattedMessage id="viewPoint.browsePicture" />
                  </span>
                  <ArrowRight />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
