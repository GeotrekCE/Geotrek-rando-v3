import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import { TrekChildGeometry } from 'modules/details/interface';
import { Coordinate2D } from 'modules/interface';
import React, { useContext } from 'react';
import { TouristicContentGeometry } from './DetailsMap';

import { MarkersWithIcon } from './MarkersWithIcon';
import { PointsReference } from './PointsReference';
import { TouristicContent } from './TouristicContent';
import { TrekChildren } from './TrekChildren';
import { Visibility } from './useDetailsMap';

export interface PointWithIcon {
  location: { x: number; y: number };
  pictogramUri: string;
  name: string;
}

type Props = {
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: TouristicContentGeometry[];
  pointsReference?: Coordinate2D[] | null;
  trekChildrenGeometry?: TrekChildGeometry[];
  trekChildrenMobileVisibility: Visibility;
  referencePointsMobileVisibility: Visibility;
  poiMobileVisibility: Visibility;
  touristicContentMobileVisibility: Visibility;
};

export const MapChildren: React.FC<Props> = props => {
  const { visibleSection } = useContext(VisibleSectionContext);

  return (
    <>
      {(visibleSection === 'children' || props.trekChildrenMobileVisibility === 'DISPLAYED') && (
        <TrekChildren trekChildrenGeometry={props.trekChildrenGeometry} />
      )}

      {(visibleSection === 'description' ||
        props.referencePointsMobileVisibility === 'DISPLAYED') && (
        <PointsReference pointsReference={props.pointsReference ?? undefined} />
      )}

      {(visibleSection === 'poi' || props.poiMobileVisibility === 'DISPLAYED') && (
        <MarkersWithIcon points={props.poiPoints} />
      )}

      {(visibleSection === 'touristicContent' ||
        props.touristicContentMobileVisibility === 'DISPLAYED') && (
        <TouristicContent contents={props.touristicContentPoints} />
      )}
    </>
  );
};
