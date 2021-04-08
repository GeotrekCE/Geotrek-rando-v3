import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, shadow, typography } from 'stylesheet';
import parse from 'html-react-parser';
import { HtmlText } from '../../utils';

interface DetailsDescriptionProps {
  descriptionHtml: string;
  className?: string;
}

export const DetailsDescription: React.FC<DetailsDescriptionProps> = ({
  descriptionHtml,
  className,
}) => {
  return (
    <div
      id="details_description"
      className={`flex flex-col
      pt-6 desktop:pt-12
      border-solid border-greySoft border-b
      ${className ?? ''}`}
    >
      <p id="details_descriptionTitle" className="text-Mobile-H1 desktop:text-H2 font-bold">
        <FormattedMessage id="details.description" />
      </p>
      <div id="details_descriptionContent" className="mt-3 desktop:mt-4 mb-6 desktop:mb-12">
        <StyledListWithSteps>{parse(descriptionHtml)}</StyledListWithSteps>
      </div>
    </div>
  );
};

const StyledListWithSteps = styled(HtmlText)`
  & > ol {
    position: relative;
    list-style: none;
    counter-reset: item;
    margin: ${getSpacing(2)} 0;
    ${desktopOnly(css`
      margin: ${getSpacing(4)} 0;
    `)}
  }
  & > ol::before {
    content: ' ';
    background-color: ${colorPalette.primary1};
    width: 3px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 14px;
    z-index: -1;
    ${desktopOnly(css`
      left: 22px;
    `)}
  }
  & > ol > li {
    counter-increment: item;
    display: flex;
    align-items: center;
    padding-top: ${getSpacing(4)};
    ${desktopOnly(css`
      padding-top: ${getSpacing(10)};
    `)}
  }
  & > ol > li:first-child {
    padding: 0;
  }
  & > ol > li::before {
    content: counter(item);
    border-radius: 100%;
    width: ${getSpacing(8)};
    height: ${getSpacing(8)};
    flex: none;
    margin-right: ${getSpacing(3.5)};
    border: solid 3px ${colorPalette.primary1};
    font-weight: bold;
    color: ${colorPalette.primary1};
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${shadow.medium};
    ${desktopOnly(css`
      width: ${getSpacing(12)};
      height: ${getSpacing(12)};
      margin-right: ${getSpacing(5.5)};
      ${typography.h4}
    `)}
  }
`;
