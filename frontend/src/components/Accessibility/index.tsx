import { SmallCarousel } from 'components/Carousel';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { Modal } from 'components/Modal';
import { CardSingleImage } from 'components/pages/details/components/DetailsCard';
import { HtmlText } from 'components/pages/details/utils';
import parse from 'html-react-parser';
import { AccessibilityAttachment, Details } from 'modules/details/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly } from 'stylesheet';
import PhoneIcon from './PhoneIcon';

const Accessibility = ({ details, language }: { details: Details; language: string }) => {
  const accessibilityCodeNumber = getGlobalConfig().accessibilityCodeNumber;
  return (
    <div>
      {details.disabledInfrastructure && (
        <HtmlText>{parse(details.disabledInfrastructure)}</HtmlText>
      )}
      {details.accessibilities.length > 0 && (
        <div className="flex">
          {details.accessibilities.map((accessibility, i) => (
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
      {details.accessbilityLevel && (
        <Section>
          <FormattedMessage id="details.accessibility_level" /> :{' '}
          {details.accessbilityLevel.name[language]}
        </Section>
      )}

      {accessibilityCodeNumber && (
        <Section>
          <FormattedMessage id="details.emergency_number" /> :
          <EmergencyNumber>
            <PhoneIcon />
            {accessibilityCodeNumber}
          </EmergencyNumber>
        </Section>
      )}
      <Columns>
        {['slope', 'width', 'signage']
          .filter(k => (details as any)[`accessibility_${k}`])
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
                <Modal>
                  {({ isFullscreen, toggleFullscreen }) => (
                    <div id="details_cover" className={!isFullscreen ? '' : 'h-full'}>
                      <StyledSmallCarousel>
                        {attachments.map((attachment, i) => (
                          <CardSingleImage
                            key={i}
                            src={attachment.url}
                            height={200}
                            onClick={toggleFullscreen}
                          />
                        ))}
                      </StyledSmallCarousel>
                    </div>
                  )}
                </Modal>

                <h2>
                  <FormattedMessage id={`details.accessibility_${k}`} /> :
                </h2>
                <p>
                  <HtmlText>{parse((details as any)[`accessibility_${k}`])}</HtmlText>
                </p>
              </div>
            );
          })}
      </Columns>
      {['accessibility_covering', 'accessibility_exposure', 'accessibility_advice']
        .filter(k => (details as any)[k])
        .map(k => (
          <Row key={k}>
            <h2>
              <FormattedMessage id={`details.${k}`} /> :
            </h2>
            <p>
              <HtmlText>{parse((details as any)[k])}</HtmlText>
            </p>
          </Row>
        ))}
    </div>
  );
};

const EmergencyNumber = styled.div`
  color: ${colorPalette.primary1};
  display: flex;
  /* border: 3px solid ${colorPalette.primary1}; */
  background-color: ${colorPalette.primary2};
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  padding: 8px;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;

  & svg {
    margin-right: 10px;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-weight: 500;
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

const StyledSmallCarousel = styled(SmallCarousel)`
  height: auto;

  & img {
    border-radius: 30px;
  }
`;

export const shouldDisplayAccessibility = (details: Details) => {
  const accessibilityCodeNumber = getGlobalConfig().accessibilityCodeNumber;

  return Boolean(
    // eslint-disable-next-line
    details.disabledInfrastructure ||
      // eslint-disable-next-line
      details.accessibilities.length > 0 ||
      // eslint-disable-next-line
      details.accessbilityLevel ||
      // eslint-disable-next-line
      details.accessibility_covering ||
      // eslint-disable-next-line
      details.accessibility_exposure ||
      // eslint-disable-next-line
      details.accessibility_advice ||
      // eslint-disable-next-line
      details.accessibility_signage ||
      // eslint-disable-next-line
      details.accessibility_slope ||
      // eslint-disable-next-line
      details.accessibility_width ||
      accessibilityCodeNumber,
  );
};

export default Accessibility;
