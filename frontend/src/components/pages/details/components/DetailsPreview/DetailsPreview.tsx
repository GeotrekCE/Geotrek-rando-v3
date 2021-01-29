import { Clock } from 'components/Icons/Clock';
import { Chip } from 'components/Chip';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { DetailsInformation } from 'modules/details/interface';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { LocalIconInformation } from 'components/Information/LocalIconInformation';
import { DetailsSection } from '../DetailsSection';

interface DetailsPreviewProps {
  ambiance?: string;
  className?: string;
  informations: DetailsInformation;
  place?: string;
  tags: string[];
  teaser?: string;
  title?: string;
}

export const DetailsPreview: React.FC<DetailsPreviewProps> = ({
  ambiance,
  className,
  informations,
  place,
  tags,
  teaser,
  title,
}) => {
  return (
    <div className={`${className ?? ''} flex flex-col mt-4 desktop:mt-12`}>
      <span className="text-Mobile-C2 desktop:text-P1">{place}</span>
      <span className="text-primary1 text-Mobile-H1 desktop:text-H1 font-bold">{title}</span>
      <div className="flex flex-wrap">
        {tags.map(tag => (
          <Chip className="mt-4 desktop:mt-6 mr-2 desktop:mr-4" key={tag}>
            {tag}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap">
        {informations.difficulty && (
          <RemoteIconInformation
            iconUri={informations.difficulty.pictogramUri}
            className={classNameInformation}
          >
            {informations.difficulty.label}
          </RemoteIconInformation>
        )}
        {informations.duration !== undefined && (
          <LocalIconInformation icon={Clock} className={classNameInformation}>
            {informations.duration}
          </LocalIconInformation>
        )}
        {informations.distance !== undefined && (
          <LocalIconInformation icon={CodeBrackets} className={classNameInformation}>
            {informations.distance}
          </LocalIconInformation>
        )}
        {informations.elevation !== undefined && (
          <LocalIconInformation icon={TrendingUp} className={classNameInformation}>
            {informations.elevation}
          </LocalIconInformation>
        )}
        {informations.courseType && (
          <RemoteIconInformation
            iconUri={informations.courseType.pictogramUri}
            className={classNameInformation}
          >
            {informations.courseType.pictogramUri}
          </RemoteIconInformation>
        )}
        {informations.networks &&
          informations.networks.map((network, i) => (
            <RemoteIconInformation
              iconUri={network.pictogramUri}
              className={classNameInformation}
              key={i}
            >
              {network.label}
            </RemoteIconInformation>
          ))}
      </div>
      <DetailsSection>
        {teaser !== undefined && (
          <div className="text-Mobile-C1 desktop:text-H4 font-bold">{teaser}</div>
        )}
        {teaser !== undefined && ambiance !== undefined && <br />}
        {ambiance !== undefined && <div className="text-Mobile-C1 desktop:text-P1">{ambiance}</div>}
      </DetailsSection>
    </div>
  );
};

const classNameInformation = 'mr-6 mt-3 desktop:mt-4 text-primary1';
