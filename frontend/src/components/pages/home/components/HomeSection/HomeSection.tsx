import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { ActivitySuggestionCard } from '../ActivitySuggestionCard';

export interface HomeSectionProps {
  title: string;
  iconUrl: string;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ title, iconUrl }) => {
  return (
    <div
      className="
        border-t border-solid border-greySoft
        pt-3 desktop:pt-18
        flex flex-col space-y-4 desktop:space-y-6"
    >
      <div className="flex items-center space-x-4">
        <SVG
          src={iconUrl}
          preProcessor={fillSvgWithColor(colorPalette.greyDarkColored)}
          className="h-10"
        />
        <span className="text-H4 desktop:text-H2 font-bold">{title}</span>
      </div>
      <div className="flex space-x-6 overflow-hidden">
        <ActivitySuggestionCard
          title="Randonnée des Écrins - Le massif des Écrins est un grand massif montagneux des Alpes françaises situé dans les Hautes-Alpes et en Isère.
        Il abrite d'importants glaciers, tant en nombre qu'en taille et possède deux sommets de plus de 4 000 mètres.
        Il était autrefois également nommé massif du Pelvoux."
          imgUrl="images/hiking-cover.jpg"
        />
      </div>
    </div>
  );
};
