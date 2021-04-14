import parse from 'html-react-parser';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { HtmlText } from '../../utils';
import { StyledLink } from '../../../../../components/Link';

interface DetailsSensitiveAreaProps extends SensitiveArea {
  className?: string;
}

export const DetailsSensitiveArea: React.FC<DetailsSensitiveAreaProps> = ({
  name,
  className,
  contact,
  infoUrl,
  description,
  period,
  practices,
}) => {
  const hasPeriodAtLeastOneMonthValid = period?.some(monthlyValidity => monthlyValidity === true);
  return (
    <div id="details_sensitiveArea" className={className}>
      {name !== null && <span className="font-bold text-H4 space-y-2">{name}</span>}
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
