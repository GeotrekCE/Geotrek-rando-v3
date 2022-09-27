import { GeometryItem } from 'components/Map/DetailsMap/GeometryItem';
import { GeometryObject } from 'modules/interface';

import { useObjectGeometry } from '../../hooks/useTrekGeometry';

interface TrekCourseProps {
  id: number;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT';
}

function removePointsFromGeometry(geometry: GeometryObject): GeometryObject {
  if (geometry.type === 'GeometryCollection') {
    return {
      ...geometry,
      geometries: geometry.geometries
        .filter(nextGeom => !nextGeom.type.includes('Point'))
        .map(nextGeom => removePointsFromGeometry(nextGeom)),
    };
  }
  return geometry;
}

export const TrekCourse: React.FC<TrekCourseProps> = ({ id, type }) => {
  const { trekGeometry } = useObjectGeometry(id, type);

  if (trekGeometry === undefined || trekGeometry.type.includes('Point')) {
    return null;
  }

  const filteredGeometry = removePointsFromGeometry(trekGeometry);

  return <GeometryItem id={String(id)} geometry={filteredGeometry} type={type} />;
};
