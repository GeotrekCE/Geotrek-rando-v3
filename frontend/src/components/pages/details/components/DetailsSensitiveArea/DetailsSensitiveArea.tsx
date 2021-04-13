import parse from 'html-react-parser';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { FormattedMessage } from 'react-intl';
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
}) => {
  return (
    <div id="details_sensitiveArea" className={className}>
      {name !== null && <span className="font-bold text-Mobile-C1 desktop:text-H4">{name}</span>}
      {description !== null && <HtmlText>{parse(description)}</HtmlText>}
      {contact !== null && (
        <>
          <span className="font-bold">
            <FormattedMessage id={'details.sensitiveAreas.contact'} />
          </span>
          <HtmlText>{parse(contact)}</HtmlText>
        </>
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
