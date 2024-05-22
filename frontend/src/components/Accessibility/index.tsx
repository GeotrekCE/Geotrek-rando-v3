import { SmallCarousel } from 'components/Carousel';
import ImageWithLegend from 'components/ImageWithLegend';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { Modal } from 'components/Modal';
import { HtmlText } from 'components/pages/details/utils';
import parse from 'html-react-parser';
import { AccessibilityAttachment, Details } from 'modules/details/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { desktopOnly } from 'stylesheet';
import PhoneIcon from './PhoneIcon';

interface Props {
  details: Details;
  language: string;
}

const Accessibility: React.FC<Props> = ({ details, language }) => {
  const accessibilityCodeNumber = getGlobalConfig().accessibilityCodeNumber;

  const shouldPictureRowBeDisplayed = details.attachmentsAccessibility
    ? ['slope', 'width', 'signage']
        .filter(k => details[`accessibility_${k}` as keyof Details])
        .flatMap(k => {
          const attachments = details.attachmentsAccessibility.filter(
            a => a.info_accessibility === k,
          );
          return attachments.length;
        })
        .filter(Boolean).length > 0
    : false;

  return (
    <div>
      {details.disabledInfrastructure && (
        <div className="custo-page-WYSIWYG">{parse(details.disabledInfrastructure)}</div>
      )}
      {details.accessibilities && details.accessibilities.length > 0 && (
        <div className="flex">
          {details.accessibilities
            .filter(e => e)
            .map((accessibility, i) => (
              <RemoteIconInformation
                key={i}
                iconUri={accessibility.pictogramUri}
                className="mr-6 mt-3 desktop:mt-4 text-primary"
              >
                {accessibility.name}
              </RemoteIconInformation>
            ))}
        </div>
      )}
      <dl>
        {details.accessbilityLevel && (
          <div className="flex items-center mt-2">
            <dt className="font-bold">
              <FormattedMessage id="details.accessibility_level" />
            </dt>{' '}
            : <dd>{details.accessbilityLevel.name[language]}</dd>
          </div>
        )}
        {accessibilityCodeNumber && (
          <div className="flex items-center mt-2">
            <dt className="font-bold">
              <FormattedMessage id="details.emergency_number" /> :
            </dt>
            <dd>
              <a
                className="flex gap-2 text-primary1 bg-primary2 font-bold text-lg my-auto ml-2 p-2 rounded-full items-center"
                href={`tel:${accessibilityCodeNumber}`}
              >
                <PhoneIcon aria-hidden />
                <span>{accessibilityCodeNumber}</span>
              </a>
            </dd>
          </div>
        )}
        <div className="flex flex-col py-3 desktop:flex-row gap-3">
          {details.attachmentsAccessibility &&
            ['slope', 'width', 'signage']
              .filter(k => details[`accessibility_${k}` as keyof Details])
              .map(k => {
                let attachments = details.attachmentsAccessibility.filter(
                  a => a.info_accessibility === k,
                );
                if (attachments.length === 0) {
                  attachments = [
                    {
                      url: getGlobalConfig().fallbackImageUri,
                    } as AccessibilityAttachment,
                  ];
                }

                return (
                  <div className="flex flex-col flex-1 min-w-0" key={k}>
                    {shouldPictureRowBeDisplayed && (
                      <Modal>
                        {({ isFullscreen, toggleFullscreen }) => (
                          <div id="details_cover" className={!isFullscreen ? '' : 'h-full'}>
                            <StyledSmallCarousel isFullscreen={isFullscreen}>
                              {attachments.map((attachment, index) => (
                                <ImageWithLegend
                                  image={
                                    isFullscreen
                                      ? attachment
                                      : { ...attachment, url: attachment.thumbnail }
                                  }
                                  className="overflow-hidden rounded-2xl"
                                  classNameImage={isFullscreen ? 'object-contain' : ''}
                                  key={index}
                                  loading="lazy"
                                  onClick={toggleFullscreen}
                                />
                              ))}
                            </StyledSmallCarousel>
                          </div>
                        )}
                      </Modal>
                    )}
                    <dt className="text-xl font-bold">
                      <FormattedMessage id={`details.accessibility_${k}`} /> :
                    </dt>
                    <dd>
                      <HtmlText>
                        {parse(details[`accessibility_${k}` as keyof Details] as string)}
                      </HtmlText>
                    </dd>
                  </div>
                );
              })}
        </div>
        {['accessibility_covering', 'accessibility_exposure', 'accessibility_advice']
          .filter(k => details[k as keyof Details])
          .map(k => (
            <div className="mt-5" key={k}>
              <dt className="text-xl font-bold">
                <FormattedMessage id={`details.${k}`} /> :
              </dt>
              <dd className="mt-2">
                <HtmlText>{parse(details[k as keyof Details] as string)}</HtmlText>
              </dd>
            </div>
          ))}
      </dl>
    </div>
  );
};

const StyledSmallCarousel = styled(SmallCarousel)<{ isFullscreen: boolean }>`
  height: auto;

  & img {
    height: ${props => (props.isFullscreen ? '100vh' : '200px')};
    margin: auto;
    cursor: pointer;
    width: 100%;

    ${desktopOnly(css`
      width: 'auto';
    `)}
  }
`;

export const shouldDisplayAccessibility = (details: Details) => {
  return Boolean(
    details.disabledInfrastructure ||
      details.accessibilities.length > 0 ||
      details.accessbilityLevel ||
      details.accessibility_covering ||
      details.accessibility_exposure ||
      details.accessibility_advice ||
      details.accessibility_signage ||
      details.accessibility_slope ||
      details.accessibility_width,
  );
};

export default Accessibility;
