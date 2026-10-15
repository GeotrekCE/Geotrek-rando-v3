import React, { useEffect, useMemo, useRef } from 'react';
import { Marker, Polygon, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { DivIcon, Marker as LeafletMarker } from 'leaflet';
import { FormattedMessage, useIntl } from 'react-intl';
import parse from 'html-react-parser';
import { VigilanceAreaGeometry } from 'modules/vigilanceArea/adapter';
import { VigilancePeriod } from 'modules/vigilanceArea/interface';
import { RawCoordinate2D } from 'modules/interface';
import { formatSinglePeriod } from 'modules/vigilanceArea/utils';

import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { VigilanceAreaBadge } from 'components/pages/details/components/DetailsVigilanceAreas/VigilanceAreaBadge';
import { getPolygonCentroid } from 'modules/utils/geometry';

export type PropsType = {
  contents?: VigilanceAreaGeometry[];
};

type CoordinatePoint =
  | [number, number]
  | { x: number; y: number }
  | { lat: number; lng: number }
  | Record<string, unknown>;

const extractPositions = (coordinates: unknown[]): RawCoordinate2D[] =>
  (coordinates as CoordinatePoint[]).map((point): RawCoordinate2D => [
    typeof point === 'object' && point !== null && 'y' in point && typeof point.y === 'number'
      ? point.y
      : Array.isArray(point) && typeof point[1] === 'number'
      ? point[1]
      : 0,
    typeof point === 'object' && point !== null && 'x' in point && typeof point.x === 'number'
      ? point.x
      : Array.isArray(point) && typeof point[0] === 'number'
      ? point[0]
      : 0,
  ]);

const createBadgeIcon = (
  typePictogramUri: string | null | undefined,
  levelPictogramUri: string | null | undefined,
  pictogramUri: string | null | undefined,
  levelMode: 'closed' | 'alert' | 'vigilance' | 'info',
  isImpracticable: boolean,
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
        isImpracticable={isImpracticable}
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

const getBgColorWithOpacity = (colorStr: string, alphaHex = '23'): string => {
  if (!colorStr) return 'transparent';
  if (colorStr.startsWith('#')) {
    if (colorStr.length === 7) return `${colorStr}${alphaHex}`;
    if (colorStr.length === 4) {
      const redChar = colorStr[1], greenChar = colorStr[2], blueChar = colorStr[3];
      return `#${redChar}${redChar}${greenChar}${greenChar}${blueChar}${blueChar}${alphaHex}`;
    }
  }
  return `color-mix(in srgb, ${colorStr} 23%, transparent)`;
};

const VigilanceAreaPolygonItem: React.FC<{
  id: string | number;
  name?: string;
  colorHex: string;
  isImpracticable?: boolean;
  levelMode: 'closed' | 'alert' | 'vigilance' | 'info';
  typeName?: string;
  levelName?: string;
  typePictogramUri?: string | null;
  levelPictogramUri?: string | null;
  pictogramUri?: string | null;
  periods?: VigilancePeriod[];
  description?: string | null;
  positions: RawCoordinate2D[];
  centroid: RawCoordinate2D;
  isHovered: boolean;
  isSelected?: boolean;
}> = ({
  id,
  name,
  colorHex,
  isImpracticable = false,
  levelMode,
  typeName,
  levelName,
  typePictogramUri,
  levelPictogramUri,
  pictogramUri,
  periods = [],
  description,
  positions,
  centroid,
  isHovered,
  isSelected = false,
}) => {
  const intl = useIntl();
  const isHighlighted = isHovered || isSelected;

  const icon = useMemo(
    () =>
      createBadgeIcon(
        typePictogramUri,
        levelPictogramUri,
        pictogramUri,
        levelMode,
        isImpracticable,
        isHighlighted,
      ),
    [typePictogramUri, levelPictogramUri, pictogramUri, levelMode, isImpracticable, isHighlighted],
  );

  const levelText = isImpracticable
    ? intl.formatMessage({
        id: 'details.vigilancePracticabilityClosed',
        defaultMessage: 'Impraticable',
      })
    : levelName ||
      intl.formatMessage({
        id: 'details.vigilanceDefaultLevel',
        defaultMessage: 'Zone de vigilance',
      });

  const singlePeriodText =
    periods.length === 1
      ? formatSinglePeriod({
          startDate: periods[0].startDate,
          endDate: periods[0].endDate,
          activeDays: periods[0].activeDays,
          annual: periods[0].annual,
          intl,
        })
      : null;

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
  const headerBgColor = isImpracticable
    ? 'color-mix(in srgb, #901A1A 12%, transparent)'
    : getBgColorWithOpacity(colorHex, '23');

  const handleMoreInfoClick = (clickEvent: React.MouseEvent) => {
    clickEvent.preventDefault();
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
                    isImpracticable={isImpracticable}
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
                  <p className="font-bold m-0" style={{ color: colorHex }}>
                    <FormattedMessage
                      id="details.vigilancePracticabilityTitle"
                      defaultMessage="Praticabilité :"
                    />{' '}
                    {isImpracticable
                      ? intl.formatMessage({
                          id: 'details.vigilancePracticabilityClosed',
                          defaultMessage: 'Impraticable',
                        })
                      : intl.formatMessage({
                          id: 'details.vigilancePracticabilityPracticable',
                          defaultMessage: 'Praticable',
                        })}
                  </p>

                  {/* Period */}
                  {periods.length > 1 ? (
                    <div>
                      <p className="m-0 text-greyDarkColored/80 font-bold">
                        <FormattedMessage id="details.vigilancePeriod" defaultMessage="Période(s) concernée(s) :" />
                      </p>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5 text-greyDarkColored/80">
                        {periods.map((vigilancePeriod, periodIndex) => {
                          const formattedPeriod = formatSinglePeriod({
                            startDate: vigilancePeriod.startDate,
                            endDate: vigilancePeriod.endDate,
                            activeDays: vigilancePeriod.activeDays,
                            annual: vigilancePeriod.annual,
                            intl,
                          });
                          return formattedPeriod ? <li key={periodIndex}>{formattedPeriod}</li> : null;
                        })}
                      </ul>
                    </div>
                  ) : singlePeriodText ? (
                    <p className="m-0 text-greyDarkColored/80">
                      <span className="font-bold">
                        <FormattedMessage id="details.vigilancePeriod" defaultMessage="Période(s) concernée(s) :" />{' '}
                      </span>
                      {singlePeriodText}
                    </p>
                  ) : null}

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
          isImpracticable,
          levelMode,
          typeName,
          levelName,
          typePictogramUri,
          levelPictogramUri,
          pictogramUri,
          periods,
          description,
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
                isImpracticable,
                levelMode,
                typeName,
                levelName,
                typePictogramUri,
                levelPictogramUri,
                pictogramUri,
                periods,
                description,
                positions,
                centroid: getPolygonCentroid(positions),
              },
            ];
          }
          if (geometry.type === 'MultiPolygon') {
            return (geometry.coordinates as unknown[][][]).flatMap(
              (polygonCoordinates, polygonIndex) => {
                const rawRing = polygonCoordinates[0];
                const positions = extractPositions(rawRing);
                if (positions.length < 3) return [];
                return [
                  {
                    key: `${id}-${polygonIndex}`,
                    id,
                    name,
                    colorHex,
                    isImpracticable,
                    levelMode,
                    typeName,
                    levelName,
                    typePictogramUri,
                    levelPictogramUri,
                    pictogramUri,
                    periods,
                    description,
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
