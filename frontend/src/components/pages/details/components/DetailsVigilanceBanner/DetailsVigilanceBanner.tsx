import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';
import { getGlobalConfig } from 'modules/utils/api.config';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { VigilanceAreaBadge } from '../DetailsVigilanceAreas/VigilanceAreaBadge';

interface DetailsVigilanceBannerProps {
  isClosed?: boolean;
  publishedVigilanceAreas?: VigilanceArea[];
  className?: string;
}

/**
 * Safely accesses a raw or dynamic property on a VigilanceArea object
 * without triggering ESLint no-explicit-any or TypeScript unsafe type assertions.
 */
const getVigilanceAreaProperty = (
  area: unknown,
  propertyName: string,
): unknown => {
  if (!area || typeof area !== 'object') return undefined;
  return (area as Record<string, unknown>)[propertyName];
};

export const DetailsVigilanceBanner: React.FC<DetailsVigilanceBannerProps> = ({
  isClosed,
  publishedVigilanceAreas = [],
  className,
}) => {
  const intl = useIntl();
  const hasVigilanceAreas = publishedVigilanceAreas.length > 0;

  if (!getGlobalConfig().enableVigilanceAreas || (!isClosed && !hasVigilanceAreas)) {
    return null;
  }

  const hasClosedArea =
    isClosed ||
    publishedVigilanceAreas.some((area: VigilanceArea) => {
      const practicability = area.practicability ?? getVigilanceAreaProperty(area, 'practicability');
      const closed = getVigilanceAreaProperty(area, 'closed');
      return (
        practicability === 'closed' ||
        practicability === 'not_practicable' ||
        closed === true
      );
    });

  const hasAlertArea = publishedVigilanceAreas.some((area: VigilanceArea) => {
    const criticality = area.criticality ?? getVigilanceAreaProperty(area, 'criticality');
    const levelObject = area.level ?? getVigilanceAreaProperty(area, 'level');
    const levelNumber = typeof levelObject === 'object' && levelObject !== null ? (levelObject as Record<string, unknown>).level : levelObject;
    return (
      criticality === 'alert' ||
      criticality === 'high' ||
      String(levelNumber) === '1'
    );
  });

  const hasVigilanceArea = publishedVigilanceAreas.some((area: VigilanceArea) => {
    const criticality = area.criticality ?? getVigilanceAreaProperty(area, 'criticality');
    const levelObject = area.level ?? getVigilanceAreaProperty(area, 'level');
    const levelNumber = typeof levelObject === 'object' && levelObject !== null ? (levelObject as Record<string, unknown>).level : levelObject;
    return criticality === 'vigilance' || String(levelNumber) === '2';
  });

  // Determine overall banner severity mode: 'closed' | 'alert' | 'vigilance' | 'info'
  let mode: 'closed' | 'alert' | 'vigilance' | 'info' = 'info';
  if (hasClosedArea) {
    mode = 'closed';
  } else if (hasAlertArea) {
    mode = 'alert';
  } else if (hasVigilanceArea) {
    mode = 'vigilance';
  }

  // Single zone citation model
  const isSingleZone = publishedVigilanceAreas.length === 1;
  const singleVigilanceArea = isSingleZone ? publishedVigilanceAreas[0] : null;

  let singleZoneSummary = '';
  if (singleVigilanceArea) {
    const levelName =
      typeof singleVigilanceArea.level === 'string'
        ? singleVigilanceArea.level
        : intl.formatMessage({
            id: `details.vigilanceBanner.level${
              mode === 'closed'
                ? 'Closed'
                : mode === 'alert'
                  ? 'Alert'
                  : mode === 'info'
                    ? 'Info'
                    : 'Vigilance'
            }`,
          });

    const typeObject = singleVigilanceArea.type ?? getVigilanceAreaProperty(singleVigilanceArea, 'type');
    const typeName =
      typeof typeObject === 'object' && typeObject !== null
        ? String(
            ((typeObject as unknown) as Record<string, unknown>).label ??
              ((typeObject as unknown) as Record<string, unknown>).name ??
              '',
          )
        : String(
            getVigilanceAreaProperty(singleVigilanceArea, 'type_name') ??
              getVigilanceAreaProperty(singleVigilanceArea, 'type') ??
              '',
          );
    const title = String(
      singleVigilanceArea.name ??
        getVigilanceAreaProperty(singleVigilanceArea, 'title') ??
        '',
    );

    const summaryParts = [levelName, typeName, title].filter(Boolean);
    singleZoneSummary = summaryParts.join(' - ');
  }

  const bannerCssLevel = mode === 'closed' ? 'fermeture' : mode;

  const representativeArea = singleVigilanceArea || publishedVigilanceAreas[0];
  const representativeLevel = representativeArea?.level ?? getVigilanceAreaProperty(representativeArea, 'level');

  const representativeLevelPictogram = (
    representativeArea?.level?.pictogramUrl ??
    getVigilanceAreaProperty(representativeLevel, 'pictogram') ??
    getVigilanceAreaProperty(representativeArea, 'levelPictogramUrl') ??
    null
  ) as string | null;

  const representativeAreaColor = (representativeArea?.color ??
    representativeArea?.level?.color ??
    getVigilanceAreaProperty(representativeLevel, 'color') ??
    null) as string | null;
  const bannerBorderColor =
    representativeAreaColor ??
    (mode === 'closed'
      ? 'var(--color-vigilance-closed)'
      : mode === 'alert'
        ? 'var(--color-vigilance-closed)'
        : mode === 'info'
          ? '#1257A8'
          : 'var(--color-vigilance-warning)');

  return (
    <div
      id="details_vigilanceBanner"
      data-encart-level={bannerCssLevel}
      style={{
        borderLeftColor: bannerBorderColor,
        backgroundColor: `color-mix(in srgb, ${bannerBorderColor} 10%, white)`,
      }}
      className={cn(
        'my-4 p-4 desktop:px-5 desktop:py-4 rounded-[12px] border-l-[4px] border-solid transition-all text-greyDarkColored',
        className,
      )}
    >
      <div className="flex items-center gap-[10px] mb-3">
        <VigilanceAreaBadge
          levelPictogramUrl={representativeLevelPictogram}
          levelMode={mode}
          isClosed={hasClosedArea}
          size={24}
        />

        <p className="text-[14px] leading-[1.5] m-0 text-greyDarkColored">
          {isSingleZone && singleZoneSummary ? (
            <FormattedMessage
              id={`details.vigilanceBanner.${mode}Single`}
              defaultMessage={
                mode === 'closed'
                  ? 'Cet itinéraire est actuellement impraticable : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et motifs de fermeture.'
                  : mode === 'alert'
                    ? 'Cet itinéraire est concerné par une Zone de vigilance élevée : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
                    : mode === 'info'
                      ? 'Cet itinéraire est concerné par une zone d’information : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les bons réflexes.'
                      : 'Cet itinéraire est concerné par une zone de vigilance : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les bons réflexes et conditions de praticabilité de vos activités.'
              }
              values={{ details: singleZoneSummary }}
            />
          ) : (
            <>
              <strong>
                <FormattedMessage
                  id={`details.vigilanceBanner.${mode}Title`}
                  defaultMessage={
                    mode === 'closed'
                      ? 'Cet itinéraire est actuellement impraticable.'
                      : mode === 'alert'
                        ? 'Cet itinéraire est concerné par au moins une Zone de vigilance élevée.'
                        : mode === 'info'
                          ? 'Cet itinéraire est concerné par au moins une zone d’information.'
                          : 'Cet itinéraire est concerné par au moins une zone de vigilance.'
                  }
                />
              </strong>{' '}
              <FormattedMessage
                id={`details.vigilanceBanner.${mode}Generic`}
                defaultMessage={
                  mode === 'closed'
                    ? 'Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et motifs de fermeture.'
                    : mode === 'alert'
                      ? 'Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
                      : mode === 'info'
                        ? 'Consultez la section « Zones de vigilance » pour en savoir plus sur les bons réflexes et conseils.'
                        : 'Consultez la section « Zones de vigilance » pour en savoir plus sur les bons réflexes et conditions de praticabilité de vos activités.'
                }
              />
            </>
          )}
        </p>
      </div>

      <a
        href="#details_vigilance"
        className="text-[14px] font-semibold text-primary1 underline hover:opacity-80 transition-opacity"
      >
        <FormattedMessage
          id="details.vigilanceBanner.moreInfoLink"
          defaultMessage="Plus d’informations sur les Zones de vigilance →"
        />
      </a>
    </div>
  );
};
