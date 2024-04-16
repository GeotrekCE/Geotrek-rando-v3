import { generateDetailsUrlFromType } from 'components/pages/details/utils';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import { getHoverId } from 'components/pages/search/utils';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import { cn } from 'services/utils/cn';
import { optimizeAndDefineColor } from 'stylesheet';

export interface HomeSectionProps {
  title: string;
  iconUrl: string;
  results: ActivitySuggestion['results'];
  className?: string;
  asColumn?: boolean;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  asColumn = false,
  title,
  iconUrl,
  results,
  className,
}) => {
  return (
    <div id={'home_section'} className={cn('custo-suggestions flex flex-col', className)}>
      {title && (
        <h2
          id="home_sectionTitle"
          className="custo-suggestions-title flex border-t border-greySoft border-solid pt-4 desktop:pt-10 mb-2 desktop:mb-6"
        >
          <SVG
            src={iconUrl}
            preProcessor={optimizeAndDefineColor()}
            className="h-10 mr-2 desktop:mr-3"
            aria-hidden
          />
          <span className="mt-1 desktop:mt-0 text-H2 desktop:text-H2 font-bold">{title}</span>
        </h2>
      )}
      <div className="custo-suggestions-content flex px-5 overflow-scroll desktop:overflow-auto desktop:px-0 desktop:grid desktop:grid-cols-3 gap-5">
        {results.map(e => {
          return (
            <ResultCard
              asColumn={asColumn}
              type={e.type}
              key={e.name}
              id={e.id}
              hoverId={getHoverId(e)}
              place={e.place}
              title={e.name}
              tags={e.tags}
              images={e.images.slice(0, 1)}
              badgeIconUri={e.category?.pictogramUri}
              badgeName={e.category?.label}
              informations={e.informations}
              redirectionUrl={generateDetailsUrlFromType(e.type, e.id, e.name)}
              className="my-4 desktop:my-6 desktop:mx-1 min-w-70 max-w-70 desktop:max-w-none shrink-0"
            />
          );
        })}
      </div>
    </div>
  );
};
