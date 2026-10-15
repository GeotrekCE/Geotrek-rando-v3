import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';
import { getGlobalConfig } from 'modules/utils/api.config';
import { ContentType } from 'modules/interface';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { isVigilanceAreaActive } from 'modules/vigilanceArea/utils';
import { VigilanceAreaBadge } from '../DetailsVigilanceAreas/VigilanceAreaBadge';

interface DetailsVigilanceBannerProps {
  isImpracticable?: boolean;
  publishedVigilanceAreas?: VigilanceArea[];
  contentType?: ContentType;
  className?: string;
}

/**
 * Safely accesses a raw or dynamic property on a VigilanceArea object
 * without triggering ESLint no-explicit-any or TypeScript unsafe type assertions.
 */
const getVigilanceAreaProperty = (
  vigilanceArea: unknown,
  propertyName: string,
): unknown => {
  if (!vigilanceArea || typeof vigilanceArea !== 'object') return undefined;
  return (vigilanceArea as Record<string, unknown>)[propertyName];
};

const isAreaImpracticable = (vigilanceArea: VigilanceArea): boolean => {
  return Boolean(vigilanceArea.isImpracticable);
};

const isAreaLevelHigh = (vigilanceArea: VigilanceArea): boolean => {
  const criticality =
    vigilanceArea.criticality ?? getVigilanceAreaProperty(vigilanceArea, 'criticality');
  const levelObject = vigilanceArea.level ?? getVigilanceAreaProperty(vigilanceArea, 'level');
  const levelNumber =
    typeof levelObject === 'object' && levelObject !== null
      ? (levelObject as Record<string, unknown>).level
      : levelObject;
  return criticality === 'alert' || criticality === 'high' || String(levelNumber) === '1';
};

const isAreaLevelMedium = (vigilanceArea: VigilanceArea): boolean => {
  const criticality =
    vigilanceArea.criticality ?? getVigilanceAreaProperty(vigilanceArea, 'criticality');
  const levelObject = vigilanceArea.level ?? getVigilanceAreaProperty(vigilanceArea, 'level');
  const levelNumber =
    typeof levelObject === 'object' && levelObject !== null
      ? (levelObject as Record<string, unknown>).level
      : levelObject;
  return criticality === 'vigilance' || String(levelNumber) === '2';
};

const isAreaFuture = (
  vigilanceArea: VigilanceArea,
  targetDate: Date = new Date(),
): boolean => {
  if (isVigilanceAreaActive(vigilanceArea, targetDate)) {
    return false;
  }
  const periods = vigilanceArea.periods || [];
  if (periods.length === 0) {
    return false;
  }
  const todayIso = targetDate.toISOString().split('T')[0];
  return periods.some(vigilancePeriod => {
    if (vigilancePeriod.annual) return true;
    if (!vigilancePeriod.endDate) return true;
    const endIso = new Date(vigilancePeriod.endDate).toISOString().split('T')[0];
    return endIso >= todayIso;
  });
};

export const DetailsVigilanceBanner: React.FC<DetailsVigilanceBannerProps> = ({
  isImpracticable,
  publishedVigilanceAreas = [],
  contentType,
  className,
}) => {
  const intl = useIntl();
  const hasVigilanceAreas = publishedVigilanceAreas.length > 0;
  const isContentImpracticable = Boolean(isImpracticable);

  if (!getGlobalConfig().enableVigilanceAreas || (!isContentImpracticable && !hasVigilanceAreas)) {
    return null;
  }

  const isTouristicContent = contentType === 'TOURISTIC_CONTENT';

  // 1. Priority 1 — Impraticabilité en cours
  const hasClosedOngoing =
    isContentImpracticable ||
    publishedVigilanceAreas.some((vigilanceArea: VigilanceArea) => {
      return isAreaImpracticable(vigilanceArea) && isVigilanceAreaActive(vigilanceArea);
    });

  // 2. Priority 2 — Vigilance haute en cours
  const hasAlertOngoing = publishedVigilanceAreas.some((vigilanceArea: VigilanceArea) => {
    return isAreaLevelHigh(vigilanceArea) && isVigilanceAreaActive(vigilanceArea);
  });

  // 3. Priority 3 — Impraticabilité à venir
  const hasClosedFuture = publishedVigilanceAreas.some((vigilanceArea: VigilanceArea) => {
    return isAreaImpracticable(vigilanceArea) && isAreaFuture(vigilanceArea);
  });

  // 4. Priority 4 — Vigilance haute ou moyenne à venir
  const hasAlertFuture = publishedVigilanceAreas.some((vigilanceArea: VigilanceArea) => {
    return (
      (isAreaLevelHigh(vigilanceArea) || isAreaLevelMedium(vigilanceArea)) &&
      isAreaFuture(vigilanceArea)
    );
  });

  // Determine priority cascade: 'p1' | 'p2' | 'p3' | 'p4' | 'p5'
  let bannerPriority: 'p1' | 'p2' | 'p3' | 'p4' | 'p5' = 'p5';
  if (hasClosedOngoing) {
    bannerPriority = 'p1';
  } else if (hasAlertOngoing) {
    bannerPriority = 'p2';
  } else if (hasClosedFuture) {
    bannerPriority = 'p3';
  } else if (hasAlertFuture) {
    bannerPriority = 'p4';
  } else {
    bannerPriority = 'p5';
  }

  // Single zone citation model (applicable to P2 and P4)
  const isSingleZone = publishedVigilanceAreas.length === 1;
  const singleVigilanceArea = isSingleZone ? publishedVigilanceAreas[0] : null;

  let singleZoneSummary = '';
  if (singleVigilanceArea) {
    const typeObject =
      singleVigilanceArea.type ?? getVigilanceAreaProperty(singleVigilanceArea, 'type');
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

    const levelObject =
      singleVigilanceArea.level ?? getVigilanceAreaProperty(singleVigilanceArea, 'level');
    const levelName =
      typeof levelObject === 'object' && levelObject !== null
        ? String(((levelObject as unknown) as Record<string, unknown>).name ?? '')
        : typeof singleVigilanceArea.level === 'string'
          ? singleVigilanceArea.level
          : intl.formatMessage({
              id: `details.vigilanceBanner.level${
                bannerPriority === 'p1'
                  ? 'Closed'
                  : bannerPriority === 'p2' || bannerPriority === 'p4'
                    ? 'Alert'
                    : 'Vigilance'
              }`,
            });

    const title = String(
      singleVigilanceArea.name ??
        getVigilanceAreaProperty(singleVigilanceArea, 'title') ??
        '',
    );

    const summaryParts = [typeName, levelName, title].filter(Boolean);
    singleZoneSummary = summaryParts.join(' - ');
  }

  const relevantArea =
    (bannerPriority === 'p1'
      ? publishedVigilanceAreas.find(
          vigilanceArea => isAreaImpracticable(vigilanceArea) && isVigilanceAreaActive(vigilanceArea),
        )
      : bannerPriority === 'p2'
        ? publishedVigilanceAreas.find(
            vigilanceArea => isAreaLevelHigh(vigilanceArea) && isVigilanceAreaActive(vigilanceArea),
          )
        : bannerPriority === 'p3'
          ? publishedVigilanceAreas.find(
              vigilanceArea => isAreaImpracticable(vigilanceArea) && isAreaFuture(vigilanceArea),
            )
          : bannerPriority === 'p4'
            ? publishedVigilanceAreas.find(
                vigilanceArea =>
                  (isAreaLevelHigh(vigilanceArea) || isAreaLevelMedium(vigilanceArea)) &&
                  isAreaFuture(vigilanceArea),
              )
            : publishedVigilanceAreas[0]) ?? publishedVigilanceAreas[0];

  const relevantLevel =
    relevantArea?.level ?? getVigilanceAreaProperty(relevantArea, 'level');

  const representativeLevelPictogram = (
    relevantArea?.level?.pictogramUrl ??
    getVigilanceAreaProperty(relevantLevel, 'pictogram') ??
    getVigilanceAreaProperty(relevantArea, 'levelPictogramUrl') ??
    null
  ) as string | null;

  const representativeType =
    relevantArea?.type ?? getVigilanceAreaProperty(relevantArea, 'type');

  const representativeTypePictogram = (
    relevantArea?.type?.pictogramUrl ??
    getVigilanceAreaProperty(representativeType, 'pictogram') ??
    getVigilanceAreaProperty(relevantArea, 'typePictogramUrl') ??
    null
  ) as string | null;

  const representativeAreaColor = (relevantArea?.color ??
    relevantArea?.level?.color ??
    getVigilanceAreaProperty(relevantLevel, 'color') ??
    null) as string | null;

  let badgeMode: 'closed' | 'alert' | 'vigilance' | 'info' = 'info';
  let bannerBorderColor = 'var(--color-vigilance-warning, #d17a00)';
  let bannerCssLevel = 'vigilance';

  if (bannerPriority === 'p1') {
    badgeMode = 'closed';
    bannerBorderColor = 'var(--color-vigilance-closed, #901A1A)';
    bannerCssLevel = 'fermeture';
  } else if (bannerPriority === 'p2') {
    badgeMode = 'alert';
    bannerBorderColor = representativeAreaColor ?? 'var(--color-vigilance-closed, #901A1A)';
    bannerCssLevel = 'alert';
  } else if (bannerPriority === 'p3') {
    badgeMode = 'vigilance';
    bannerBorderColor = 'var(--color-vigilance-warning, #d17a00)';
    bannerCssLevel = 'vigilance';
  } else if (bannerPriority === 'p4') {
    badgeMode = 'vigilance';
    bannerBorderColor = representativeAreaColor ?? 'var(--color-vigilance-warning, #d17a00)';
    bannerCssLevel = 'vigilance';
  } else {
    badgeMode = 'info';
    bannerBorderColor = representativeAreaColor ?? '#1257A8';
    bannerCssLevel = 'info';
  }

  const renderBannerContent = () => {
    if (bannerPriority === 'p1') {
      return (
        <>
          <strong>
            <FormattedMessage
              id={
                isTouristicContent
                  ? 'details.vigilanceBanner.p1ClosedTitleContent'
                  : 'details.vigilanceBanner.p1ClosedTitle'
              }
              defaultMessage={
                isTouristicContent
                  ? 'Cette zone est actuellement impraticable.'
                  : 'Cet itinéraire est actuellement impraticable.'
              }
            />
          </strong>{' '}
          <FormattedMessage
            id="details.vigilanceBanner.p1ClosedGeneric"
            defaultMessage="Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et conditions de praticabilité de vos activités."
          />
        </>
      );
    }

    if (bannerPriority === 'p2') {
      if (isSingleZone && singleZoneSummary) {
        return (
          <FormattedMessage
            id={
              isTouristicContent
                ? 'details.vigilanceBanner.p2AlertSingleContent'
                : 'details.vigilanceBanner.p2AlertSingle'
            }
            defaultMessage={
              isTouristicContent
                ? 'Attention : cette zone est concernée par une zone de vigilance élevée : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
                : 'Attention : cet itinéraire est concerné par une zone de vigilance élevée : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
            }
            values={{ details: singleZoneSummary }}
          />
        );
      }
      return (
        <>
          <strong>
            <FormattedMessage
              id={
                isTouristicContent
                  ? 'details.vigilanceBanner.p2AlertTitleContent'
                  : 'details.vigilanceBanner.p2AlertTitle'
              }
              defaultMessage={
                isTouristicContent
                  ? 'Attention : cette zone est concernée par au moins une zone de vigilance élevée.'
                  : 'Attention : cet itinéraire est concerné par au moins une zone de vigilance élevée.'
              }
            />
          </strong>{' '}
          <FormattedMessage
            id="details.vigilanceBanner.p2AlertGeneric"
            defaultMessage="Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités."
          />
        </>
      );
    }

    if (bannerPriority === 'p3') {
      return (
        <>
          <strong>
            <FormattedMessage
              id={
                isTouristicContent
                  ? 'details.vigilanceBanner.p3FutureClosedTitleContent'
                  : 'details.vigilanceBanner.p3FutureClosedTitle'
              }
              defaultMessage={
                isTouristicContent
                  ? "Cette zone peut être impraticable à certaines périodes de l'année."
                  : "Cet itinéraire peut être impraticable à certaines périodes de l'année."
              }
            />
          </strong>{' '}
          <FormattedMessage
            id="details.vigilanceBanner.p3FutureClosedGeneric"
            defaultMessage="Consultez la section « Zones de vigilance » pour en savoir plus sur les dates et conditions de praticabilité de vos activités."
          />
        </>
      );
    }

    if (bannerPriority === 'p4') {
      if (isSingleZone && singleZoneSummary) {
        return (
          <FormattedMessage
            id={
              isTouristicContent
                ? 'details.vigilanceBanner.p4FutureAlertSingleContent'
                : 'details.vigilanceBanner.p4FutureAlertSingle'
            }
            defaultMessage={
              isTouristicContent
                ? 'Attention : cette zone est concernée par une zone de vigilance élevée : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
                : 'Attention : cet itinéraire est concerné par une zone de vigilance élevée : {details}. Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités.'
            }
            values={{ details: singleZoneSummary }}
          />
        );
      }
      return (
        <>
          <strong>
            <FormattedMessage
              id={
                isTouristicContent
                  ? 'details.vigilanceBanner.p4FutureAlertTitleContent'
                  : 'details.vigilanceBanner.p4FutureAlertTitle'
              }
              defaultMessage={
                isTouristicContent
                  ? 'Attention : cette zone est concernée par au moins une zone de vigilance élevée.'
                  : 'Attention : cet itinéraire est concerné par au moins une zone de vigilance élevée.'
              }
            />
          </strong>{' '}
          <FormattedMessage
            id="details.vigilanceBanner.p4FutureAlertGeneric"
            defaultMessage="Consultez la section « Zones de vigilance » pour en savoir plus sur les risques et conditions de praticabilité de vos activités."
          />
        </>
      );
    }

    // Default Priority 5
    return (
      <>
        <strong>
          <FormattedMessage
            id={
              isTouristicContent
                ? 'details.vigilanceBanner.p5DefaultTitleContent'
                : 'details.vigilanceBanner.p5DefaultTitle'
            }
            defaultMessage={
              isTouristicContent
                ? 'Cette zone peut comporter des zones de vigilance.'
                : 'Cet itinéraire peut comporter des zones de vigilance.'
            }
          />
        </strong>{' '}
        <FormattedMessage
          id="details.vigilanceBanner.p5DefaultGeneric"
          defaultMessage="Consultez la section « Zones de vigilance » pour en savoir plus sur les conditions d'accès et bons comportements à adopter dans vos activités."
        />
      </>
    );
  };

  return (
    <div
      id="details_vigilanceBanner"
      data-encart-level={bannerCssLevel}
      data-priority={bannerPriority}
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
          typePictogramUrl={representativeTypePictogram}
          levelPictogramUrl={representativeLevelPictogram}
          levelMode={badgeMode}
          isImpracticable={bannerPriority === 'p1'}
          size={24}
        />

        <p className="text-[14px] leading-[1.5] m-0 text-greyDarkColored">
          {renderBannerContent()}
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

