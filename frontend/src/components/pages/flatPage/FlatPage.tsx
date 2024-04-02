import { useMemo } from 'react';
import Loader from 'components/Loader';
import Image from 'next/image';
import { colorPalette } from 'stylesheet';
import parse, { DOMNode, Element } from 'html-react-parser';
import { Footer } from 'components/Footer';
import { Separator } from 'components/Separator';
import { PageHead } from 'components/PageHead';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { generateFlatPageUrl } from 'modules/header/utills';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getSuggestionType } from 'modules/flatpage/utils';
import { useFlatPage } from './useFlatPage';
import { DetailsSection } from '../details/components/DetailsSection';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsSource } from '../details/components/DetailsSource';
import Breadcrumb from '../details/components/DetailsPreview/Breadcrumb';
import { HomeSection } from '../home/components/HomeSection';

interface FlatPageUIProps {
  flatPageUrl: string;
}

export const FlatPageUI: React.FC<FlatPageUIProps> = ({ flatPageUrl }) => {
  const { flatPage, isLoading, refetch, activitySuggestions } = useFlatPage(flatPageUrl);
  const intl = useIntl();

  const parsedFlatPage = useMemo(() => { 
    if (!flatPage?.content || !flatPage.content.length) { 
      return null; 
    } 
    return parse(flatPage.content, {
      replace: (domNode: DOMNode) => {
        if (
          domNode instanceof Element &&
          domNode.attribs &&
          'data-ids' in domNode.attribs &&
          'data-type' in domNode.attribs &&
          domNode.attribs.class.includes('suggestions')
        ) {
          const suggestion = activitySuggestions.find(
            item =>
              item.results.map(({ id }) => id).join(',') ===
                domNode.attribs['data-ids'] &&
              item.type === getSuggestionType(domNode.attribs['data-type']),
          );
          if (!suggestion || suggestion.results.length === 0) {
            return null;
          }
          return (
            <HomeSection
              title={suggestion.titleTranslationId}
              iconUrl={suggestion.iconUrl}
              results={suggestion.results}
              asColumn
            />
          );
        }
        return domNode;
      },
    }); 
  }, [activitySuggestions, flatPage?.content] );

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
          {flatPage.attachment && flatPage.attachment.length > 0 && (
            <div
              className="relative coverDetailsMobile desktop:h-coverDetailsDesktop text-center"
              id="flatPage_cover"
            >
              <Image
                src={flatPage.attachment}
                className="size-full object-top object-cover"
                alt=""
                width={1500}
                height={550}
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
          <div className="px-4 mx-auto max-w-[900px]" id="flatPage_content">
            {(flatPage.attachment == null || flatPage.attachment.length === 0) && (
              <div className="flex justify-center py-6 desktop:py-12">
                <h1 className="text-H3 desktop:text-H1 font-bold text-primary1 text-center">
                  {flatPage.title}
                </h1>
              </div>
            )}
            <Breadcrumb
              breadcrumb={[
                {
                  label: intl.formatMessage({ id: 'header.home' }),
                  link: '/',
                },
                { label: flatPage?.title },
              ]}
            />
            {flatPage.content !== null && flatPage.content.length > 0 && (
              <div className="custo-page-WYSIWYG mb-10 text-lg desktop:text-xl">
                {parsedFlatPage}
              </div>
            )}
            {flatPage.sources.length > 0 && (
              <>
                <Separator />
                <DetailsSection className="mb-10" titleId="details.source">
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
            {flatPage.children && flatPage.children.length > 0 && (
              <>
                <Separator />
                <h2 className="my-6 desktop:my-10 text-Mobile-H1 desktop:text-H2 font-bold">
                  <FormattedMessage id="page.children.title" />
                </h2>
                <ul className="mb-6 desktop:mb-18 flex flex-wrap gap-5 desktop:grid desktop:grid-cols-3 desktop:gap-6">
                  {flatPage.children.map(child => (
                    <li className="w-70 desktop:w-auto" key={child.id}>
                      <a
                        className="relative block rounded-xl overflow-hidden group after:absolute bg-gradient-to-t from-gradientOnImages after:inset-0 after:content-[''] after:bg-black/25"
                        href={generateFlatPageUrl(child.id, child.title)}
                      >
                        <Image
                          src={child.attachment ?? getGlobalConfig().fallbackImageUri}
                          className="size-full object-cover object-center transition-transform group-hover:scale-105"
                          width={400}
                          height={400}
                          alt=""
                        />
                        <span className="font-bold items-center desktop:text-lg text-white absolute z-10 bottom-4 right-4 left-4">
                          {child.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

const TextWithShadow = styled.h1`
  text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
`;
