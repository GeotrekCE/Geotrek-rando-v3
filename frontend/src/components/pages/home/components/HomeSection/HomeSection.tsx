import { generateDetailsUrlFromType } from 'components/pages/details/utils';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import { getHoverId } from 'components/pages/search/utils';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { fillSvgWithColor } from 'stylesheet';

export interface HomeSectionProps {
  title: string;
  iconUrl: string;
  results: ActivitySuggestion['results'];
}

export const HomeSection: React.FC<HomeSectionProps> = ({ title, iconUrl, results }) => {
  return (
    <div id={'home_section'} className={`flex flex-col`}>
      <h2
        id="home_sectionTitle"
        className="flex border-t border-greySoft border-solid pt-4 desktop:pt-10 mb-2 desktop:mb-6 mx-4 desktop:mx-10percent"
      >
        <SVG src={iconUrl} preProcessor={fillSvgWithColor()} className="h-10 mr-2 desktop:mr-3" />
        <span className="mt-1 desktop:mt-0 text-H2 desktop:text-H2 font-bold">{title}</span>
      </h2>
      <ScrollContainer className="flex p-5 overflow-scroll desktop:overflow-auto desktop:mx-10percent desktop:px-0 desktop:grid desktop:grid-cols-3 desktop:gap-3">
        {results.map(e => {
          return (
            <ResultCard
              asColumn
              type={e.type}
              key={e.name}
              id={e.id}
              hoverId={getHoverId(e)}
              place={e.place}
              title={e.name}
              tags={e.tags}
              attachments={e.attachments.slice(0, 1)}
              badgeIconUri={e.category?.pictogramUri}
              badgeName={e.category?.label}
              informations={e.informations}
              redirectionUrl={generateDetailsUrlFromType(e.type, e.id, e.name)}
              className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
            />
          );
        })}
      </ScrollContainer>
    </div>
  );
};

const ScrollContainer = styled.div`
  @media (max-width: 1024px) {
    & > * {
      flex: auto;
      max-width: 300px;
      min-width: 300px;
      margin-right: 20px;
    }
  }
`;
