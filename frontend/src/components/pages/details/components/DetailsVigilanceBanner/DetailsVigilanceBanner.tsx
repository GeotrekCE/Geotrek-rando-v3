import React from 'react';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { getGlobalConfig } from 'modules/utils/api.config';
import { ContentType } from 'modules/interface';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { getLevelMode, isVigilanceAreaActive } from 'modules/vigilanceArea/utils';
import { VigilanceAreaBadge } from '../DetailsVigilanceAreas/VigilanceAreaBadge';

interface DetailsVigilanceBannerProps {
  isImpracticable?: boolean;
  vigilanceAreas?: VigilanceArea[];
  contentType?: ContentType;
  className?: string;
}

const isAreaImpracticable = (vigilanceArea: VigilanceArea): boolean => {
  return Boolean(vigilanceArea.isImpracticable);
};

const isAreaLevelHigh = (vigilanceArea: VigilanceArea): boolean => {
  const levelNumber = vigilanceArea.level?.level ?? null;
  const levelMode = getLevelMode(levelNumber, vigilanceArea.criticality);
  return levelMode === 'alert';
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
  vigilanceAreas = [],
  contentType,
  className,
}) => {
  const hasVigilanceAreas = vigilanceAreas.length > 0;
  const isContentImpracticable = Boolean(isImpracticable);

  if (!getGlobalConfig().enableVigilanceAreas || (!isContentImpracticable && !hasVigilanceAreas)) {
    return null;
  }

  const isTouristicContent = contentType === 'TOURISTIC_CONTENT';
  const isOutdoorSite = contentType === 'OUTDOOR_SITE';
  const isOutdoorCourse = contentType === 'OUTDOOR_COURSE';

  // 1. Priority 1 — Impraticabilité en cours
  const hasClosedOngoing =
    isContentImpracticable ||
    vigilanceAreas.some((vigilanceArea: VigilanceArea) => {
      return isAreaImpracticable(vigilanceArea) && isVigilanceAreaActive(vigilanceArea);
    });

  // 2. Priority 2 — Vigilance haute en cours
  const hasAlertOngoing = vigilanceAreas.some((vigilanceArea: VigilanceArea) => {
    return isAreaLevelHigh(vigilanceArea) && isVigilanceAreaActive(vigilanceArea);
  });

  // 3. Priority 3 — Impraticabilité à venir
  const hasClosedFuture = vigilanceAreas.some((vigilanceArea: VigilanceArea) => {
    return isAreaImpracticable(vigilanceArea) && isAreaFuture(vigilanceArea);
  });

  // Determine priority cascade: 'p1' | 'p2' | 'p3' | 'p4'
  let bannerPriority: 'p1' | 'p2' | 'p3' | 'p4' = 'p4';
  if (hasClosedOngoing) {
    bannerPriority = 'p1';
  } else if (hasAlertOngoing) {
    bannerPriority = 'p2';
  } else if (hasClosedFuture) {
    bannerPriority = 'p3';
  } else {
    bannerPriority = 'p4';
  }

  // Single zone citation model (applicable to P2)
  const isSingleZone = vigilanceAreas.length === 1;
  const singleVigilanceArea = isSingleZone ? vigilanceAreas[0] : null;

  let singleZoneSummary = '';
  if (singleVigilanceArea) {
    const typeName = singleVigilanceArea.type?.rawName ?? singleVigilanceArea.type?.name ?? '';
    const levelName = singleVigilanceArea.level?.name ?? '';
    const title = singleVigilanceArea.name ?? '';
    const summaryParts = [levelName, typeName, title].filter(Boolean);
    singleZoneSummary = summaryParts.join(' - ');
  }

  const relevantArea =
    (bannerPriority === 'p1'
      ? vigilanceAreas.find(
          vigilanceArea => isAreaImpracticable(vigilanceArea) && isVigilanceAreaActive(vigilanceArea),
        )
      : bannerPriority === 'p2'
        ? vigilanceAreas.find(
            vigilanceArea => isAreaLevelHigh(vigilanceArea) && isVigilanceAreaActive(vigilanceArea),
          )
        : bannerPriority === 'p3'
          ? vigilanceAreas.find(
              vigilanceArea => isAreaImpracticable(vigilanceArea) && isAreaFuture(vigilanceArea),
            )
          : vigilanceAreas[0]) ?? vigilanceAreas[0];

  const relevantLevelNumber = relevantArea?.level?.level ?? null;
  const relevantCriticality = getLevelMode(relevantLevelNumber, relevantArea?.criticality) ?? null;
  const representativeLevelPictogram = relevantArea?.level?.pictogramUrl ?? null;
  const representativeTypePictogram = relevantArea?.type?.pictogramUrl ?? null;
  const representativeAreaColor = relevantArea?.color ?? relevantArea?.level?.color ?? null;

  let badgeMode: 'closed' | 'alert' | 'vigilance' | 'info' | undefined = relevantCriticality ?? undefined;
  let bannerBorderColor = 'var(--color-vigilance-warning, #d17a00)';
  let bannerCssLevel = 'vigilance';

  if (bannerPriority === 'p1') {
    badgeMode = 'closed';
    bannerBorderColor = 'var(--color-vigilance-closed, #901A1A)';
    bannerCssLevel = 'fermeture';
  } else if (bannerPriority === 'p2') {
    badgeMode = relevantCriticality ?? 'alert';
    bannerBorderColor = representativeAreaColor ?? 'var(--color-vigilance-closed, #901A1A)';
    bannerCssLevel = 'alert';
  } else if (bannerPriority === 'p3') {
    badgeMode = relevantCriticality ?? 'vigilance';
    bannerBorderColor = 'var(--color-vigilance-warning, #d17a00)';
    bannerCssLevel = 'vigilance';
  } else {
    badgeMode = relevantCriticality ?? undefined;
    bannerBorderColor = representativeAreaColor ?? '#1257A8';
    bannerCssLevel = relevantCriticality === 'vigilance' ? 'vigilance' : 'info';
  }

  const p1ClosedTitleId = isTouristicContent
    ? 'details.vigilanceBanner.p1ClosedTitleContent'
    : isOutdoorSite
    ? 'details.vigilanceBanner.p1ClosedTitleSite'
    : isOutdoorCourse
    ? 'details.vigilanceBanner.p1ClosedTitleCourse'
    : 'details.vigilanceBanner.p1ClosedTitle';

  const p2AlertSingleId = isTouristicContent
    ? 'details.vigilanceBanner.p2AlertSingleContent'
    : isOutdoorSite
    ? 'details.vigilanceBanner.p2AlertSingleSite'
    : isOutdoorCourse
    ? 'details.vigilanceBanner.p2AlertSingleCourse'
    : 'details.vigilanceBanner.p2AlertSingle';

  const p2AlertTitleId = isTouristicContent
    ? 'details.vigilanceBanner.p2AlertTitleContent'
    : isOutdoorSite
    ? 'details.vigilanceBanner.p2AlertTitleSite'
    : isOutdoorCourse
    ? 'details.vigilanceBanner.p2AlertTitleCourse'
    : 'details.vigilanceBanner.p2AlertTitle';

  const p3FutureClosedTitleId = isTouristicContent
    ? 'details.vigilanceBanner.p3FutureClosedTitleContent'
    : isOutdoorSite
    ? 'details.vigilanceBanner.p3FutureClosedTitleSite'
    : isOutdoorCourse
    ? 'details.vigilanceBanner.p3FutureClosedTitleCourse'
    : 'details.vigilanceBanner.p3FutureClosedTitle';

  const p4DefaultTitleId = isTouristicContent
    ? 'details.vigilanceBanner.p5DefaultTitleContent'
    : isOutdoorSite
    ? 'details.vigilanceBanner.p5DefaultTitleSite'
    : isOutdoorCourse
    ? 'details.vigilanceBanner.p5DefaultTitleCourse'
    : 'details.vigilanceBanner.p5DefaultTitle';

  const renderBannerContent = () => {
    if (bannerPriority === 'p1') {
      return (
        <>
          <strong>
            <FormattedMessage id={p1ClosedTitleId} />
          </strong>{' '}
          <FormattedMessage id="details.vigilanceBanner.p1ClosedGeneric" />
        </>
      );
    }

    if (bannerPriority === 'p2') {
      if (isSingleZone && singleZoneSummary) {
        return (
          <FormattedMessage
            id={p2AlertSingleId}
            values={{ details: singleZoneSummary }}
          />
        );
      }
      return (
        <>
          <strong>
            <FormattedMessage id={p2AlertTitleId} />
          </strong>{' '}
          <FormattedMessage id="details.vigilanceBanner.p2AlertGeneric" />
        </>
      );
    }

    if (bannerPriority === 'p3') {
      return (
        <>
          <strong>
            <FormattedMessage id={p3FutureClosedTitleId} />
          </strong>{' '}
          <FormattedMessage id="details.vigilanceBanner.p3FutureClosedGeneric" />
        </>
      );
    }

    // Default Priority 4
    return (
      <>
        <strong>
          <FormattedMessage id={p4DefaultTitleId} />
        </strong>{' '}
        <FormattedMessage id="details.vigilanceBanner.p5DefaultGeneric" />
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
          levelNumber={relevantLevelNumber}
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
        <FormattedMessage id="details.vigilanceBanner.moreInfoLink" />
      </a>
    </div>
  );
};
