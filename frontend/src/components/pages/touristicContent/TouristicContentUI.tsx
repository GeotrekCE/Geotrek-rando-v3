import { Layout } from 'components/Layout/Layout';
import Loader from 'react-loader';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { useTouristicContent } from './useTouristicContent';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { DetailsSection } from '../details/components/DetailsSection';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsSource } from '../details/components/DetailsSource';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { ImageWithLegend } from '../details/components/DetailsCoverCarousel/DetailsCoverCarousel';
import { marginDetailsChild } from '../details/Details';

interface TouristicContentUIProps {
  touristicContentUrl: string | string[] | undefined;
}

export const TouristicContentUI: React.FC<TouristicContentUIProps> = ({ touristicContentUrl }) => {
  const { id, touristicContent, isLoading, refetch } = useTouristicContent(touristicContentUrl);
  return (
    <Layout>
      {touristicContent === undefined ? (
        isLoading ? (
          <Loader
            loaded={!isLoading}
            options={{
              top: `${sizes.desktopHeader + sizes.filterBar}px`,
              color: colorPalette.primary1,
              zIndex: zIndex.loader,
            }}
          />
        ) : (
          <ErrorFallback refetch={refetch} />
        )
      ) : (
        <div className="flex flex-1">
          <div
            className="flex flex-col w-full
              relative -top-detailsHeaderMobile desktop:top-0
              desktop:w-3/5"
          >
            <div className="h-coverDetailsMobile desktop:h-coverDetailsDesktop">
              {touristicContent.attachments.length > 1 ? (
                <DetailsCoverCarousel attachments={touristicContent.attachments} />
              ) : (
                <ImageWithLegend attachment={touristicContent.attachments[0]} />
              )}
            </div>
            <div
              className="desktop:py-0
                desktop:relative desktop:-top-9
                flex flex-col"
            >
              <DetailsTopIcons
                className={marginDetailsChild}
                pdfUri={touristicContent.pdf}
                practice={{
                  pictogram: touristicContent.category.pictogramUri,
                  name: touristicContent.category.label,
                }}
              />
              <DetailsPreview
                className={marginDetailsChild}
                informations={{
                  duration: null,
                  distance: null,
                  elevation: null,
                  difficulty: null,
                  courseType: null,
                  networks: [],
                }}
                place={touristicContent.place}
                tags={touristicContent.themes}
                title={touristicContent.name}
                teaser={touristicContent.descriptionTeaser}
                ambiance={touristicContent.description}
                id={id}
              />
              {touristicContent.sources.length > 0 && (
                <DetailsSection titleId="details.source" className={marginDetailsChild}>
                  <div>
                    {touristicContent.sources.map((source, i) => (
                      <DetailsSource
                        key={i}
                        name={source.name}
                        website={source.website}
                        pictogramUri={source.pictogramUri}
                      />
                    ))}
                  </div>
                </DetailsSection>
              )}
            </div>
          </div>
          <div className="hidden desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-0 bg-primary2" />
        </div>
      )}
    </Layout>
  );
};
