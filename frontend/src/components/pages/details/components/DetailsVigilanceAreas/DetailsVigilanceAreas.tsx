import React, { useMemo } from 'react';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { sortVigilanceAreas } from 'modules/vigilanceArea/utils';
import { DetailsSection } from '../DetailsSection';
import { VigilanceAreaItem } from './VigilanceAreaItem';

interface DetailsVigilanceAreasProps {
  vigilanceAreas?: VigilanceArea[];
  className?: string;
}

export const DetailsVigilanceAreas: React.FC<DetailsVigilanceAreasProps> = ({
  vigilanceAreas = [],
  className,
}) => {
  const sortedVigilanceAreas = useMemo(
    () => sortVigilanceAreas(vigilanceAreas),
    [vigilanceAreas],
  );

  if (!sortedVigilanceAreas || sortedVigilanceAreas.length === 0) {
    return null;
  }

  return (
    <div id="details_vigilance_ref">
      <DetailsSection
        htmlId="details_vigilance"
        titleId="details.vigilance"
        className={className}
      >
        <div className="flex flex-col gap-3 desktop:gap-4 mt-4">
          {sortedVigilanceAreas.map((vigilanceArea, index) => (
            <VigilanceAreaItem
              key={vigilanceArea.id}
              index={index}
              area={vigilanceArea}
            />
          ))}
        </div>
      </DetailsSection>
    </div>
  );
};
