import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';
import { getGlobalConfig } from 'modules/utils/api.config';
import { VigilanceAreaBadge } from '../DetailsVigilanceAreas/VigilanceAreaBadge';

interface DetailsVigilanceBannerProps {
  isClosed?: boolean;
  publishedVigilanceAreas?: any[];
  className?: string;
}

export const DetailsVigilanceBanner: React.FC<DetailsVigilanceBannerProps> = ({
  isClosed,
  publishedVigilanceAreas = [],
  className,
}) => {
  const intl = useIntl();
  const hasAreas = publishedVigilanceAreas.length > 0;

  if (!getGlobalConfig().enableVigilanceAreas || (!isClosed && !hasAreas)) {
    return null;
  }

  const hasClosedArea =
    isClosed ||
    publishedVigilanceAreas.some(
      (area: any) =>
        area?.practicability === 'closed' ||
        area?.practicability === 'not_practicable' ||
        area?.closed === true,
    );

  const hasAlertArea = publishedVigilanceAreas.some((area: any) => {
    const levelNum =
      typeof area?.level === 'object' && area?.level !== null ? area.level.level : area?.level;
    return (
      area?.criticality === 'alert' ||
      area?.criticality === 'high' ||
      levelNum === 1 ||
      levelNum === '1'
    );
  });

  const hasVigilanceArea = publishedVigilanceAreas.some((area: any) => {
    const levelNum =
      typeof area?.level === 'object' && area?.level !== null ? area.level.level : area?.level;
    return area?.criticality === 'vigilance' || levelNum === 2 || levelNum === '2';
  });

  // Determine banner mode: 'closed' | 'alert' | 'vigilance' | 'info'
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
  const singleArea = isSingleZone ? publishedVigilanceAreas[0] : null;

  let singleZoneDetails = '';
  if (singleArea) {
    const levelName =
      typeof singleArea.level === 'string'
        ? singleArea.level
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
    const typeName =
      typeof singleArea.type === 'object' && singleArea.type !== null
        ? singleArea.type.label ?? singleArea.type.name
        : singleArea.type_name ?? singleArea.type ?? '';
    const title = singleArea.title ?? singleArea.name ?? '';

    const parts = [levelName, typeName, title].filter(Boolean);
    singleZoneDetails = parts.join(' - ');
  }

  const encartLevel = mode === 'closed' ? 'fermeture' : mode;

  const primaryArea = singleArea || publishedVigilanceAreas[0];

  const levelPicto =
    primaryArea?.level?.pictogramUrl ??
    primaryArea?.level?.pictogram ??
    primaryArea?.levelPictogramUrl;

  const primaryAreaColor = primaryArea?.color || primaryArea?.level?.color;
  const bannerColor =
    primaryAreaColor ??
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
      data-encart-level={encartLevel}
      style={{
        borderLeftColor: bannerColor,
        backgroundColor: `color-mix(in srgb, ${bannerColor} 10%, white)`,
      }}
      className={cn(
        'my-4 p-4 desktop:px-5 desktop:py-4 rounded-[12px] border-l-[4px] border-solid transition-all text-greyDarkColored',
        className,
      )}
    >
      <div className="flex items-center gap-[10px] mb-3">
        <VigilanceAreaBadge
          levelPictogramUrl={levelPicto}
          levelMode={mode}
          isClosed={hasClosedArea}
          size={24}
        />

        <p className="text-[14px] leading-[1.5] m-0 text-greyDarkColored">
          {isSingleZone && singleZoneDetails ? (
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
              values={{ details: singleZoneDetails }}
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
