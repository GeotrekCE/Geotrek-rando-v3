import parse from 'html-react-parser';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { FormattedDate, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing } from 'stylesheet';
import { StyledLink } from '../../../../../components/Link';
import { HtmlText } from '../../utils';

type DetailsSensitiveAreaProps = Omit<SensitiveArea, 'geometry'> & { className?: string };

export const DetailsSensitiveArea: React.FC<DetailsSensitiveAreaProps> = ({
  name,
  className,
  contact,
  infoUrl,
  description,
  period,
  practices,
  color,
}) => {
  const hasPeriodAtLeastOneMonthValid = period?.some(monthlyValidity => monthlyValidity === true);
  return (
    <div id="details_sensitiveArea" className={className}>
      <div className="flex items-center space-x-2" id="details_sensitiveAreaTitle">
        <ColorLegendIcon color={color} />
        {name !== null && <span className="font-bold text-H4 space-y-2">{name}</span>}
      </div>
      {description !== null && (
        <SensitiveAreaSection>
          <HtmlText>{parse(description)}</HtmlText>
        </SensitiveAreaSection>
      )}
      {practices.length > 0 && (
        <SensitiveAreaSection labelId="practices">
          <div>{practices.map(practice => practice.name).join(', ')}</div>
        </SensitiveAreaSection>
      )}
      {period !== null && hasPeriodAtLeastOneMonthValid && (
        <SensitiveAreaSection labelId="period">
          <div>
            {period.map((monthlyValidity, i) =>
              monthlyValidity ? <StyledMonth monthNumber={i} key={i} /> : undefined,
            )}
          </div>
        </SensitiveAreaSection>
      )}
      {contact !== null && (
        <SensitiveAreaSection labelId="contact">
          <HtmlText>{parse(contact)}</HtmlText>
        </SensitiveAreaSection>
      )}
      {infoUrl !== null && (
        <SensitiveAreaSection>
          <StyledLink href={infoUrl}>
            <FormattedMessage id={'details.knowMore'} />
          </StyledLink>
        </SensitiveAreaSection>
      )}
    </div>
  );
};

const ColorLegendIcon = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: ${borderRadius.medium};
  border: 2px solid ${colorPalette.greyDarkColored};
  height: ${getSpacing(6)};
  width: ${getSpacing(6)};
`;
interface SensitiveAreaSectionProps {
  labelId?: string;
  children: React.ReactNode;
}

const SensitiveAreaSection: React.FC<SensitiveAreaSectionProps> = ({ labelId, children }) => {
  return (
    <div className="mt-1 desktop:mt-2">
      {labelId !== undefined && (
        <div className="font-bold">
          <FormattedMessage id={`details.sensitiveAreas.${labelId}`} />
        </div>
      )}
      {children}
    </div>
  );
};

interface FormattedMonthProps {
  monthNumber: number;
}

const StyledMonth: React.FC<FormattedMonthProps> = ({ monthNumber }) => {
  return (
    <span className="mr-2">
      <FormattedDate value={new Date(1990, monthNumber, 1)} month="short" />
    </span>
  );
};
