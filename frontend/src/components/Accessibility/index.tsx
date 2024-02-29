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
        <HtmlText>{parse(details.disabledInfrastructure)}</HtmlText>
      )}
      {details.accessibilities && details.accessibilities.length > 0 && (
        <div className="flex">
          {details.accessibilities
            .filter(e => e)
            .map((accessibility, i) => (
              <StyledRemoteIconInformation
                key={i}
                iconUri={accessibility.pictogramUri}
                className="mr-6 mt-3 desktop:mt-4 text-primary"
              >
                {accessibility.name}
              </StyledRemoteIconInformation>
            ))}
        </div>
      )}
      {details.accessbilityLevel && (
        <Section>
          <strong>
            <FormattedMessage id="details.accessibility_level" />
          </strong>{' '}
          : {details.accessbilityLevel.name[language]}
        </Section>
      )}

      {accessibilityCodeNumber && (
        <Section>
          <strong>
            <FormattedMessage id="details.emergency_number" />
          </strong>{' '}
          :
          <a
            className="flex text-primary1 bg-primary2 font-bold text-lg my-auto ml-2 p-2 rounded-full items-center"
            href={`tel:${accessibilityCodeNumber}`}
          >
            <PhoneIcon />
            <span className="ml-2">{accessibilityCodeNumber}</span>
          </a>
        </Section>
      )}
      <Columns>
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
                <div key={k}>
                  {shouldPictureRowBeDisplayed && (
                    <Modal>
                      {({ isFullscreen, toggleFullscreen }) => (
                        <div id="details_cover" className={!isFullscreen ? '' : 'h-full'}>
                          <StyledSmallCarousel isFullscreen={isFullscreen}>
                            {attachments.map((attachment, index) => (
                              <ImageWithLegend
                                attachment={
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

                  <h2>
                    <FormattedMessage id={`details.accessibility_${k}`} /> :
                  </h2>
                  <div>
                    <HtmlText>
                      {parse(details[`accessibility_${k}` as keyof Details] as string)}
                    </HtmlText>
                  </div>
                </div>
              );
            })}
      </Columns>
      {['accessibility_covering', 'accessibility_exposure', 'accessibility_advice']
        .filter(k => details[k as keyof Details])
        .map(k => (
          <Row key={k}>
            <h2>
              <FormattedMessage id={`details.${k}`} /> :
            </h2>
            <div>
              <HtmlText>{parse(details[k as keyof Details] as string)}</HtmlText>
            </div>
          </Row>
        ))}
    </div>
  );
};

const StyledRemoteIconInformation = styled(RemoteIconInformation)`
  * {
    font-size: 16px;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  & strong {
    font-weight: bold;
  }
`;

const Row = styled.div`
  margin-top: 20px;

  & h2 {
    font-size: 20px;
    font-weight: 700;
  }

  & p {
    margin-top: 10px;
  }
`;

const Columns = styled.div`
  display: flex;
  margin-left: -10px;
  flex-flow: column;
  ${desktopOnly(css`
    flex-flow: row;
  `)}

  & h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  & > div {
    min-width: 150px;
    flex: 1;
    display: flex;
    flex-flow: column;
    margin: 10px;
  }
`;

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
