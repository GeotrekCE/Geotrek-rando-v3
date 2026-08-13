import React from 'react';
import { DetailsSection } from '../DetailsSection';
import { VigilanceAreaItem } from './VigilanceAreaItem';

interface DetailsVigilanceAreasProps {
  publishedVigilanceAreas?: any[];
  className?: string;
}

export const DetailsVigilanceAreas: React.FC<DetailsVigilanceAreasProps> = ({
  publishedVigilanceAreas = [],
  className,
}) => {
  if (!publishedVigilanceAreas || publishedVigilanceAreas.length === 0) {
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
          {publishedVigilanceAreas.map((area, index) => (
            <VigilanceAreaItem
              key={area?.id ?? index}
              index={index}
              area={area}
              defaultOpen={false}
            />
          ))}
        </div>
      </DetailsSection>
    </div>
  );
};
