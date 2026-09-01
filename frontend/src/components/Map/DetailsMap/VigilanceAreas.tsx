import React, { useEffect, useMemo, useRef } from 'react';
import { Marker, Polygon, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { DivIcon, Marker as LeafletMarker } from 'leaflet';
import { FormattedMessage, useIntl } from 'react-intl';
import parse from 'html-react-parser';
import { VigilanceAreaGeometry } from 'modules/vigilanceArea/adapter';
import { RawCoordinate2D } from 'modules/interface';
import { formatVigilancePeriod } from 'modules/vigilanceArea/utils';

import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { VigilanceAreaBadge } from 'components/pages/details/components/DetailsVigilanceAreas/VigilanceAreaBadge';
import { getPolygonCentroid } from 'modules/utils/geometry';

export type PropsType = {
  contents?: VigilanceAreaGeometry[];
};

const extractPositions = (coordinates: unknown[]): RawCoordinate2D[] =>
  coordinates.map((point: any): RawCoordinate2D => [
    typeof point === 'object' && 'y' in point ? point.y : point[1],
    typeof point === 'object' && 'x' in point ? point.x : point[0],
  ]);

const createBadgeIcon = (
  typePictogramUri: string | null | undefined,
  levelPictogramUri: string | null | undefined,
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
      <VigilanceAreaBadge
        typePictogramUrl={typePictogramUri}
        levelPictogramUrl={levelPictogramUri}
        pictogramUrl={pictogramUri}
        levelMode={levelMode}
        size={size}
      />
    </div>,
  );

  return new DivIcon({
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: 'bg-none border-none',
  });
};

const VigilanceAreaPolygonItem: React.FC<{
  id: string | number;
  name?: string;
  colorHex: string;
  levelMode: 'closed' | 'alert' | 'vigilance' | 'info';
  typeName?: string;
  typePictogramUri?: string | null;
  levelPictogramUri?: string | null;
  pictogramUri?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  activeDays?: (number | string)[];
  activeMonths?: (number | string)[];
  description?: string | null;
  practicability?: string;
  positions: RawCoordinate2D[];
  centroid: RawCoordinate2D;
  isHovered: boolean;
  isSelected?: boolean;
}> = ({
  id,
  name,
  colorHex,
  levelMode,
  typeName,
  typePictogramUri,
  levelPictogramUri,
  pictogramUri,
  startDate,
  endDate,
  activeDays = [],
  activeMonths = [],
  description,
  practicability,
  positions,
  centroid,
  isHovered,
  isSelected = false,
}) => {
  const intl = useIntl();
  const isHighlighted = isHovered || isSelected;

  const icon = useMemo(
    () => createBadgeIcon(typePictogramUri, levelPictogramUri, pictogramUri, levelMode, isHighlighted),
    [typePictogramUri, levelPictogramUri, pictogramUri, levelMode, isHighlighted],
  );

  const isClosed =
    practicability === 'closed' ||
    practicability === 'not_practicable' ||
    levelMode === 'closed';

  let practicabilityText = '';
  if (isClosed) {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityClosed',
      defaultMessage: 'Itinéraire fermé / Interdit d’accès',
    });
  } else if (
    practicability === 'conditions' ||
    practicability === 'under_condition_practicable'
  ) {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityConditions',
      defaultMessage: 'Praticable sous conditions',
    });
  }

  const levelText = intl.formatMessage({
    id: `details.vigilanceLevelPrefix.${levelMode}`,
    defaultMessage:
      levelMode === 'closed'
        ? 'Impraticable'
        : levelMode === 'alert'
        ? 'Vigilance élevée'
        : levelMode === 'info'
        ? 'Conseil'
        : 'Zone de vigilance',
  });

  const periodText = formatVigilancePeriod({
    startDate,
    endDate,
    activeDays,
    activeMonths,
    intl,
    isHeader: false,
  });

  const { selectedVigilanceAreaId, setSelectedVigilanceAreaId } = useDetailsAndMapContext();
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    if (
      selectedVigilanceAreaId !== null &&
      String(selectedVigilanceAreaId) !== String(id) &&
      markerRef.current?.isPopupOpen()
    ) {
      markerRef.current.closePopup();
    }
  }, [selectedVigilanceAreaId, id]);

  const headerTitle = `${levelText}${typeName ? ` – ${typeName}` : ''}`;

  const getBgColorWithOpacity = (colorStr: string, alphaHex = '23'): string => {
    if (!colorStr) return 'transparent';
    if (colorStr.startsWith('#')) {
      if (colorStr.length === 7) return `${colorStr}${alphaHex}`;
      if (colorStr.length === 4) {
        const r = colorStr[1], g = colorStr[2], b = colorStr[3];
        return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
      }
    }
    return `color-mix(in srgb, ${colorStr} 23%, transparent)`;
  };

  const headerBgColor = getBgColorWithOpacity(colorHex, '23');

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedVigilanceAreaId(String(id));
    const element = document.getElementById(`details_vigilanceArea_${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isValidCentroid =
    Array.isArray(centroid) &&
    centroid.length >= 2 &&
    typeof centroid[0] === 'number' &&
    typeof centroid[1] === 'number' &&
    !isNaN(centroid[0]) &&
    !isNaN(centroid[1]);

  return (
    <>
      {positions.length >= 3 && (
        <Polygon
          positions={positions}
          pathOptions={{
            color: colorHex,
            fillColor: colorHex,
            fillOpacity: isHighlighted ? 0.6 : 0.25,
            weight: isHighlighted ? 6 : 3,
          }}
        />
      )}
      {isValidCentroid && (
        <Marker ref={markerRef} position={centroid} icon={icon}>
          {name && (
            <Popup className="vigilance-popup">
              <div className="w-64 max-w-full overflow-hidden text-greyDarkColored font-sans">
                {/* Header */}
                <div
                  className="p-3 pr-7 flex items-center gap-2 font-bold text-sm"
                  style={{ backgroundColor: headerBgColor, color: colorHex }}
                >
                  <VigilanceAreaBadge
                    typePictogramUrl={typePictogramUri}
                    levelPictogramUrl={levelPictogramUri}
                    pictogramUrl={pictogramUri}
                    levelMode={levelMode}
                    size={20}
                  />
                  <span className="truncate">{headerTitle}</span>
                </div>

                {/* Body */}
                <div className="p-3 bg-white space-y-2 text-xs">
                  {/* Title */}
                  <h4 className="font-bold text-greyDarkColored text-sm m-0 leading-snug">
                    {name}
                  </h4>

                  {/* Practicability */}
                  {practicabilityText && (
                    <p className="font-bold m-0" style={{ color: colorHex }}>
                      {practicabilityText}
                    </p>
                  )}

                  {/* Period */}
                  {periodText && (
                    <p className="m-0 text-greyDarkColored/80">
                      <FormattedMessage id="details.vigilancePeriod" defaultMessage="Période concernée :" />{' '}
                      {periodText}
                    </p>
                  )}

                  {/* Description */}
                  {Boolean(description) && (
                    <div className="m-0 text-greyDarkColored/90 line-clamp-3 leading-snug [&>p]:m-0 [&>p]:inline">
                      {typeof description === 'string' ? parse(description) : null}
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="pt-1">
                    <a
                      href={`#details_vigilanceArea_${id}`}
                      onClick={handleMoreInfoClick}
                      className="inline-flex items-center gap-1 font-bold text-primary1 hover:underline cursor-pointer"
                    >
                      <FormattedMessage id="details.knowMore" defaultMessage="Plus d'informations" />
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      )}
    </>
  );
};

export const VigilanceAreas: React.FC<PropsType> = ({ contents }) => {
  const { hoveredVigilanceAreaId, selectedVigilanceAreaId } = useDetailsAndMapContext();

  const polygons = useMemo(() => {
    if (!contents || contents.length === 0) return null;
    return contents
      .map(
        ({
          id,
          name,
          colorHex,
          levelMode,
          typeName,
          typePictogramUri,
          levelPictogramUri,
          pictogramUri,
          startDate,
          endDate,
          activeDays,
          activeMonths,
          description,
          practicability,
          geometry,
        }) => {
          if (!geometry || !geometry.type || !geometry.coordinates) {
            return [];
          }
          if (geometry.type === 'Polygon') {
            const rawRing = (geometry.coordinates as unknown[][])[0];
            const positions = extractPositions(rawRing);
            if (positions.length < 3) return [];
            return [
              {
                key: id,
                id,
                name,
                colorHex,
                levelMode,
                typeName,
                typePictogramUri,
                levelPictogramUri,
                pictogramUri,
                startDate,
                endDate,
                activeDays,
                activeMonths,
                description,
                practicability,
                positions,
                centroid: getPolygonCentroid(positions),
              },
            ];
          }
          if (geometry.type === 'MultiPolygon') {
            return (geometry.coordinates as unknown[][][]).flatMap(
              (polygonCoordinates, index) => {
                const rawRing = polygonCoordinates[0];
                const positions = extractPositions(rawRing);
                if (positions.length < 3) return [];
                return [
                  {
                    key: `${id}-${index}`,
                    id,
                    name,
                    colorHex,
                    levelMode,
                    typeName,
                    typePictogramUri,
                    levelPictogramUri,
                    pictogramUri,
                    startDate,
                    endDate,
                    activeDays,
                    activeMonths,
                    description,
                    practicability,
                    positions,
                    centroid: getPolygonCentroid(positions),
                  },
                ];
              },
            );
          }
          return [];
        },
      )
      .flat();
  }, [contents]);

  if (polygons === null || polygons.length === 0) {
    return null;
  }

  return (
    <>
      {polygons.map(({ key, ...polygonProps }) => (
        <VigilanceAreaPolygonItem
          key={key}
          {...polygonProps}
          isHovered={String(polygonProps.id) === String(hoveredVigilanceAreaId)}
          isSelected={String(polygonProps.id) === String(selectedVigilanceAreaId)}
        />
      ))}
    </>
  );
};
