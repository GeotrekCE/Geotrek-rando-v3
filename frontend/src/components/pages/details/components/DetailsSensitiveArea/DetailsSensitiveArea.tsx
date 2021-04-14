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
}) => {
  const hasPeriodAtLeastOneMonthValid = period?.some(monthlyValidity => monthlyValidity === true);
  return (
    <div id="details_sensitiveArea" className={className}>
      {name !== null && <span className="font-bold text-H4 space-y-2">{name}</span>}
      {description !== null && <HtmlText>{parse(description)}</HtmlText>}
      {period !== null && hasPeriodAtLeastOneMonthValid && (
        <div className="mt-1 desktop:mt-2">
          <span className="font-bold">
            <FormattedMessage id={'details.sensitiveAreas.period'} />
          </span>
          <div>
            {period.map((monthlyValidity, i) =>
              monthlyValidity ? <StyledMonth monthNumber={i} key={i} /> : undefined,
            )}
          </div>
        </div>
      )}
      {contact !== null && (
        <div className="mt-1 desktop:mt-2">
          <span className="font-bold">
            <FormattedMessage id={'details.sensitiveAreas.contact'} />
          </span>
          <HtmlText>{parse(contact)}</HtmlText>
        </div>
      )}
      {infoUrl !== null && (
        <div className="mt-1 desktop:mt-2">
          <StyledLink href={infoUrl}>
            <FormattedMessage id={'details.knowMore'} />
          </StyledLink>
        </div>
      )}
    </div>
  );
};

interface FormattedMonthProps {
  monthNumber: number;
}

export const StyledMonth: React.FC<FormattedMonthProps> = ({ monthNumber }) => {
  return (
    <span className="mr-2">
      <FormattedDate value={new Date(1990, monthNumber, 1)} month="short" />
    </span>
  );
};
