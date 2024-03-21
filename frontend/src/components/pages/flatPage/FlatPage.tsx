import Loader from 'components/Loader';
import { colorPalette } from 'stylesheet';
import parse from 'html-react-parser';
import { Footer } from 'components/Footer';
import { Separator } from 'components/Separator';
import { PageHead } from 'components/PageHead';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useFlatPage } from './useFlatPage';
import { DetailsSection } from '../details/components/DetailsSection';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsSource } from '../details/components/DetailsSource';
import { HtmlText } from '../details/utils';
import Breadcrumb from '../details/components/DetailsPreview/Breadcrumb';

interface FlatPageUIProps {
  flatPageUrl: string;
}

const BreadcrumbWrapper = styled.div`
  margin-left: 2rem;
`;

export const FlatPageUI: React.FC<FlatPageUIProps> = ({ flatPageUrl }) => {
  const { flatPage, isLoading, refetch } = useFlatPage(flatPageUrl);
  const intl = useIntl();

  return (
    <>
      <PageHead
        title={flatPage?.title}
        description={`${String(flatPage?.title)} information page`}
      />
      {flatPage === undefined ? (
        isLoading === true ? (
          <Loader />
        ) : (
          <ErrorFallback refetch={refetch} />
        )
      ) : (
        <div id="flatPage_container">
          {flatPage.attachment !== null && flatPage.attachment.length > 0 && (
            <div
              className="relative coverDetailsMobile desktop:h-coverDetailsDesktop text-center"
              id="flatPage_cover"
            >
              <img
                src={flatPage.attachment}
                className="size-full object-top object-cover"
                alt=""
              />
              <TextWithShadow
                className="text-H3 desktop:text-H1
                font-bold text-white
                absolute bottom-0 top-0 right-0 left-0 flex items-center justify-center
                bg-gradient-to-t from-gradientOnImages"
              >
                {flatPage.title}
              </TextWithShadow>
            </div>
          )}
          <div className="px-4 desktop:px-10vw py-4 desktop:py-10" id="flatPage_content">
            {(flatPage.attachment == null || flatPage.attachment.length === 0) && (
              <div className="flex justify-center py-6 desktop:py-12">
                <p className="text-H3 desktop:text-H1 font-bold text-primary1 text-center">
                  {flatPage.title}
                </p>
              </div>
            )}
            <BreadcrumbWrapper>
              <Breadcrumb
                breadcrumb={[
                  {
                    label: intl.formatMessage({ id: 'header.home' }),
                    link: '/',
                  },
                  { label: flatPage?.title },
                ]}
              />
            </BreadcrumbWrapper>
            {flatPage.content !== null && flatPage.content.length > 0 && (
              <HtmlText>{parse(flatPage.content)}</HtmlText>
            )}
            {flatPage.sources.length > 0 && (
              <>
                <Separator />
                <DetailsSection titleId="details.source">
                  <div>
                    {flatPage.sources.map((source, i) => (
                      <DetailsSource
                        key={i}
                        name={source.name}
                        website={source.website}
                        pictogramUri={source.pictogramUri}
                      />
                    ))}
                  </div>
                </DetailsSection>
              </>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

const TextWithShadow = styled.p`
  text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
`;
