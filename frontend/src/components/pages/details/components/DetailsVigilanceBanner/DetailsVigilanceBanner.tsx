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

  // Check if any area has high criticality / alert
  const hasAlertArea = publishedVigilanceAreas.some((area: any) => {
    const level = area?.level ?? area?.criticality;
    return level === 'alert' || level === 'high' || level === '3';
  });

  // Determine banner mode: 'closed' | 'alert' | 'vigilance'
  let mode: 'closed' | 'alert' | 'vigilance' = 'vigilance';
  if (isClosed) {
    mode = 'closed';
  } else if (hasAlertArea) {
    mode = 'alert';
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
              mode === 'closed' ? 'Closed' : mode === 'alert' ? 'Alert' : 'Vigilance'
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

  const isRedVariant = mode === 'closed' || mode === 'alert';
  const encartLevel = mode === 'closed' ? 'fermeture' : mode;

  const primaryArea = singleArea || publishedVigilanceAreas[0];
  const primaryAreaType = primaryArea?.type ?? primaryArea?.vigilance_area_type;
  const singleAreaPicto =
    typeof primaryAreaType === 'object' && primaryAreaType !== null
      ? primaryAreaType.pictogramUrl ?? primaryAreaType.pictogram ?? primaryAreaType.pictogramUri
      : primaryArea?.pictogramUrl ?? primaryArea?.pictogram;

  return (
    <div
      id="details_vigilanceBanner"
      data-encart-level={encartLevel}
      className={cn(
        'my-4 p-4 desktop:px-5 desktop:py-4 rounded-[12px] border-l-[4px] border-solid transition-all',
        isRedVariant
          ? 'bg-[color-mix(in_srgb,var(--color-vigilance-closed)_10%,white)] border-l-vigilanceClosed text-greyDarkColored'
          : 'bg-[color-mix(in_srgb,var(--color-vigilance-warning)_10%,white)] border-l-vigilanceWarning text-greyDarkColored',
        className,
      )}
    >
      <div className="flex items-center gap-[10px] mb-3">
        <VigilanceAreaBadge
          pictogramUrl={singleAreaPicto}
          levelMode={mode}
          isClosed={isClosed}
          size={24}
        />

        <p className="text-[14px] leading-[1.5] m-0 text-greyDarkColored">
          <strong>
            <FormattedMessage
              id={`details.vigilanceBanner.${mode}Title`}
              defaultMessage={
                mode === 'closed'
                  ? 'Cet itinéraire est actuellement fermé.'
                  : mode === 'alert'
                  ? 'Cet itinéraire est concerné par une vigilance élevée.'
                  : 'Cet itinéraire est concerné par au moins une zone de vigilance.'
              }
            />
          </strong>{' '}
          {isSingleZone && singleZoneDetails ? (
            <FormattedMessage
              id={`details.vigilanceBanner.${mode}Single`}
              defaultMessage={
                mode === 'closed'
                  ? 'Cet itinéraire est actuellement fermé : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et motifs de fermeture.'
                  : mode === 'alert'
                  ? 'Cet itinéraire est concerné par une vigilance élevée : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
                  : 'Cet itinéraire est concerné par une zone de vigilance : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les bons réflexes et conditions de praticabilité de vos activités.'
              }
              values={{ details: singleZoneDetails }}
            />
          ) : (
            <FormattedMessage
              id={`details.vigilanceBanner.${mode}Generic`}
              defaultMessage={
                mode === 'closed'
                  ? 'Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et motifs de fermeture.'
                  : mode === 'alert'
                  ? 'Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
                  : 'Consultez la section « Zones de vigilance » pour en savoir plus sur les bons réflexes et conditions de praticabilité de vos activités.'
              }
            />
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
