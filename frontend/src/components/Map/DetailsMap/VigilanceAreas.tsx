import React, { useMemo } from 'react';
import { Marker, Polygon, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { DivIcon } from 'leaflet';
import { VigilanceAreaGeometry } from 'modules/vigilanceArea/adapter';
import { RawCoordinate2D } from 'modules/interface';

import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { VigilanceAreaBadge } from 'components/pages/details/components/DetailsVigilanceAreas/VigilanceAreaBadge';
import { getPolygonCentroid } from 'modules/utils/geometry';

export type PropsType = {
  contents?: VigilanceAreaGeometry[];
};

const createBadgeIcon = (
  pictogramUri: string | null | undefined,
  levelMode: 'closed' | 'alert' | 'vigilance' | 'info',
  isHovered: boolean,
): DivIcon => {
  const baseSize = 32;
  const size = isHovered ? 42 : baseSize;
  const html = renderToStaticMarkup(
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: isHovered
          ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))'
          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.2s ease, filter 0.2s ease',
      }}
    >
      <VigilanceAreaBadge pictogramUrl={pictogramUri} levelMode={levelMode} size={size} />
    </div>,
  );

  return new DivIcon({
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: 'bg-none border-none',
  });
};

export const VigilanceAreas: React.FC<PropsType> = ({ contents }) => {
  const { hoveredVigilanceAreaId } = useDetailsAndMapContext();

  const polygons = useMemo(() => {
    if (!contents || contents.length === 0) {
      return null;
    }
    return contents
      .map(({ id, name, colorHex, levelMode, typeName, geometry, pictogramUri }) => {
        if (!geometry || !geometry.type || !geometry.coordinates) {
          return [];
        }
        if (geometry.type === 'MultiPolygon') {
          return geometry.coordinates.flatMap((polygon: any, polygonIdx: number) =>
            polygon.map((line: any, lineIdx: number) => {
              const positions: RawCoordinate2D[] = line.map((point: any): RawCoordinate2D => [
                typeof point.y === 'number' ? point.y : point[1],
                typeof point.x === 'number' ? point.x : point[0],
              ]);
              return {
                key: `${id}-${polygonIdx}-${lineIdx}`,
                id,
                name,
                colorHex,
                levelMode,
                typeName,
                pictogramUri,
                positions,
                centroid: getPolygonCentroid(positions),
              };
            }),
          );
        }
        if (geometry.type === 'Polygon') {
          return geometry.coordinates.map((line: any, lineIdx: number) => {
            const positions: RawCoordinate2D[] = line.map((point: any): RawCoordinate2D => [
              typeof point.y === 'number' ? point.y : point[1],
              typeof point.x === 'number' ? point.x : point[0],
            ]);
            return {
              key: `${id}-${lineIdx}`,
              id,
              name,
              colorHex,
              levelMode,
              typeName,
              pictogramUri,
              positions,
              centroid: getPolygonCentroid(positions),
            };
          });
        }
        return [];
      })
      .flat();
  }, [contents]);

  if (polygons === null || polygons.length === 0) {
    return null;
  }

  return (
    <>
      {polygons.map(
        ({ key, id, name, colorHex, levelMode, typeName, pictogramUri, positions, centroid }) => {
          const isHovered = String(id) === String(hoveredVigilanceAreaId);
          return (
            <React.Fragment key={key}>
              <Polygon
                positions={positions}
                pathOptions={{
                  color: colorHex,
                  fillColor: colorHex,
                  fillOpacity: isHovered ? 0.6 : 0.25,
                  weight: isHovered ? 6 : 3,
                }}
              />
              <Marker
                position={centroid}
                icon={createBadgeIcon(pictogramUri, levelMode, isHovered)}
              >
                {name && (
                  <Popup>
                    <div className="p-1 text-xs">
                      {typeName && (
                        <p className="font-bold text-greyDarkColored m-0">{typeName}</p>
                      )}
                      <p className="font-bold m-0 mt-0.5" style={{ color: colorHex }}>
                        {name}
                      </p>
                    </div>
                  </Popup>
                )}
              </Marker>
            </React.Fragment>
          );
        },
      )}
    </>
  );
};
