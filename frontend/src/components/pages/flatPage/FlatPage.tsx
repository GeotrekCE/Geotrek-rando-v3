import { useId, useMemo } from 'react';
import Loader from 'components/Loader';
import Image from 'next/image';
import parse, { DOMNode, domToReact, Element } from 'html-react-parser';
import StyleToJS from 'style-to-js';
import { Footer } from 'components/Footer';
import { Separator } from 'components/Separator';
import { PageHead } from 'components/PageHead';
import { FormattedMessage, useIntl } from 'react-intl';
import { generateFlatPageUrl } from 'modules/header/utills';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getSuggestionType } from 'modules/flatpage/utils';
import { cn } from 'services/utils/cn';
import { Modal } from 'components/Modal';
import useHasMounted from 'hooks/useHasMounted';
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
  const idCaption = useId();
  const isMounted = useHasMounted();

  const parsedFlatPage = useMemo(() => {
    if (!flatPage?.content || !flatPage.content.length) {
      return null;
    }
    return parse(flatPage.content, {
      replace: (domNode: DOMNode) => {
        const suggestionsSection =
          domNode instanceof Element &&
          domNode.attribs &&
          'data-ids' in domNode.attribs &&
          'data-type' in domNode.attribs &&
          domNode.attribs.class.includes('suggestions');

        if (suggestionsSection) {
          const suggestion = activitySuggestions.find(
            item =>
              item.results.some(({ id }) => domNode.attribs['data-ids'].split(',').includes(id)) &&
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
        const imgTagWithoutLink =
          domNode instanceof Element &&
          domNode.tagName === 'img' &&
          domNode.parent instanceof Element &&
          domNode.parent.tagName !== 'a';

        if (imgTagWithoutLink) {
          const { style, ...attribs } = domNode.attribs;
          if (!isMounted) {
            // eslint-disable-next-line @next/next/no-img-element
            return <img loading="lazy" alt="" {...attribs} />;
          }
          return (
            <Modal style={StyleToJS(style)}>
              {({ isFullscreen, toggleFullscreen }) => {
                const Tag =
                  domNode.parent instanceof Element && domNode.parent.tagName === 'figure'
                    ? 'figure'
                    : 'div';
                return isFullscreen ? (
                  <Tag>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      alt=""
                      {...attribs}
                      onClick={toggleFullscreen}
                      className="object-center overflow-hidden size-full object-contain"
                    />
                    {Tag === 'figure' && domNode.next?.next instanceof Element && (
                      <figcaption>{domToReact(domNode.next.next.children as DOMNode[])}</figcaption>
                    )}
                  </Tag>
                ) : (
                  <button type="button" aria-haspopup="dialog" onClick={toggleFullscreen}>
                    <span className="sr-only">
                      <FormattedMessage id="details.openPictureInFullScreen" />
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="object-cover" loading="lazy" alt="" {...attribs} />
                  </button>
                );
              }}
            </Modal>
          );
        }
        return domNode;
      },
    });
  }, [activitySuggestions, flatPage?.content, isMounted]);

  const legendCoverImage = [flatPage?.image?.legend, flatPage?.image?.author]
    .filter(Boolean)
    .join(' - ');

  const ImageCoverTag = legendCoverImage ? 'figure' : 'div';

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
          {flatPage.image && (
            <div className="relative text-center" id="flatPage_cover">
              <ImageCoverTag
                className={cn(
                  'relative',
                  legendCoverImage &&
                    "after:content-[''] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-20 after:bg-gradient-to-t after:from-blackSemiTransparent",
                )}
                {...(legendCoverImage && {
                  ['aria-labelledby']: idCaption,
                })}
              >
                <Image
                  src={flatPage.image.url}
                  className="custo-flatpage-cover size-full object-center object-cover"
                  alt=""
                  width={1500}
                  height={550}
                />
                {legendCoverImage && (
                  <figcaption
                    id={idCaption}
                    className="absolute bottom-2 right-2 text-white text-Mobile-C3 desktop:text-P2 z-10"
                  >
                    {legendCoverImage}
                  </figcaption>
                )}
              </ImageCoverTag>
              <h1
                className="text-H3 desktop:text-H1
                font-bold text-white
                absolute bottom-0 top-0 right-0 left-0 flex items-center justify-center
                bg-[radial-gradient(closest-side,rgba(0,0,0,0.2),transparent)]
                textShadowOnImage"
              >
                {flatPage.title}
              </h1>
            </div>
          )}
          <div className="px-4 mx-auto max-w-[940px]" id="flatPage_content">
            {flatPage.image == null && (
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
              <div className="custo-page-WYSIWYG mb-10 text-lg desktop:text-xl after:content-[''] after:clear-both after:table">
                {parsedFlatPage}
              </div>
            )}
            {flatPage.children && flatPage.children.length > 0 && (
              <>
                <Separator />
                <h2 className="my-6 desktop:my-10 text-Mobile-H1 desktop:text-H2 font-bold">
                  <FormattedMessage id="page.children.title" />
                </h2>
                <ul className="mb-6 desktop:mb-18 gap-5 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] desktop:grid-cols-3 desktop:gap-6">
                  {flatPage.children.map(child => (
                    <li key={child.id}>
                      <a
                        className="relative block aspect-square rounded-xl overflow-hidden group after:absolute after:content-[''] after:right-0 after:bottom-0 after:left-0 after:h-1/2 after:bg-gradient-to-t after:from-blackSemiTransparent after:via-blackSemiTransparent"
                        href={generateFlatPageUrl(child.id, child.title)}
                      >
                        <Image
                          src={child.image?.url ?? getGlobalConfig().fallbackImageUri}
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
            {flatPage.sources.length > 0 && (
              <>
                <Separator />
                <DetailsSection className="mb-10" titleId="details.source">
                  {flatPage.sources.map((source, i) => (
                    <DetailsSource
                      key={i}
                      name={source.name}
                      website={source.website}
                      pictogramUri={source.pictogramUri}
                    />
                  ))}
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
