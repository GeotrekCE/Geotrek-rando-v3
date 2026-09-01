import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { FileFromAttachment } from 'modules/interface';
import { Source } from 'modules/source/interface';
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { formatVigilancePeriod } from 'modules/vigilanceArea/utils';
import { cn } from 'services/utils/cn';
import { Paperclip } from 'components/Icons/Paperclip';
import { VigilanceAreaBadge } from './VigilanceAreaBadge';

interface VigilanceAreaItemProps {
  area: VigilanceArea | Record<string, unknown>;
  index?: number;
  defaultOpen?: boolean;
  className?: string;
}

export const VigilanceAreaItem: React.FC<VigilanceAreaItemProps> = ({
  area,
  index = 0,
  defaultOpen = false,
  className,
}) => {
  const intl = useIntl();

  const rawArea = (area as unknown) as Record<string, unknown>;

  const id = (rawArea?.id ?? `area-${index}`) as string | number;
  const title = (rawArea?.title ?? rawArea?.name ?? '') as string;

  // Extract type label and pictogram
  const typeObj = (rawArea?.type ?? rawArea?.vigilance_area_type) as Record<string, unknown> | null;
  const typeName = (
    typeof typeObj === 'object' && typeObj !== null
      ? typeObj.label ?? typeObj.name ?? ''
      : rawArea?.type_name ?? (typeof typeObj === 'string' ? typeObj : '')
  ) as string;
  const typePicto = (
    typeof typeObj === 'object' && typeObj !== null
      ? typeObj.pictogramUrl ?? typeObj.pictogram ?? typeObj.pictogramUri ?? null
      : rawArea?.typePictogramUrl ?? rawArea?.pictogramUrl ?? rawArea?.pictogram ?? null
  ) as string | null;

  const levelObj = rawArea?.level as Record<string, unknown> | null;
  const levelPicto = (levelObj?.pictogramUrl ?? levelObj?.pictogram ?? rawArea?.levelPictogramUrl ?? null) as string | null;

  // Determine criticality / level
  const isClosed =
    rawArea?.practicability === 'closed' ||
    rawArea?.practicability === 'not_practicable' ||
    rawArea?.closed === true;
  const levelNum = typeof levelObj === 'object' && levelObj !== null ? levelObj.level : rawArea?.level;

  let levelMode: 'closed' | 'alert' | 'vigilance' | 'info' = 'vigilance';
  if (isClosed) {
    levelMode = 'closed';
  } else if (rawArea?.criticality === 'alert' || rawArea?.criticality === 'high' || levelNum === 1 || levelNum === '1') {
    levelMode = 'alert';
  } else if (rawArea?.criticality === 'info' || levelNum === 3 || levelNum === '3') {
    levelMode = 'info';
  }

  const isRedVariant = levelMode === 'closed' || levelMode === 'alert';

  // Dates
  const startDateStr = (rawArea?.startDate ?? rawArea?.start_date) as string | null;
  const endDateStr = (rawArea?.endDate ?? rawArea?.end_date) as string | null;

  // Description & Info
  const description = (rawArea?.description ?? '') as string;
  const practicalInfo = (rawArea?.practicalInfo ?? rawArea?.practical_info ?? '') as string;
  const externalUrl = (rawArea?.externalInfoUrl ?? rawArea?.external_info_url ?? null) as string | null;
  const updateDatetimeStr = rawArea?.updateDatetime ?? rawArea?.update_datetime;
  const updateDatetime =
    typeof updateDatetimeStr === 'string' || typeof updateDatetimeStr === 'number' || updateDatetimeStr instanceof Date
      ? new Date(updateDatetimeStr)
      : null;
  const sources = (rawArea?.sources as Source[]) || [];
  const files = (rawArea?.attachments as FileFromAttachment[]) || [];
  const activeDays = (rawArea?.activeDays || rawArea?.active_days || []) as (number | string)[];
  const activeMonths = (rawArea?.activeMonths || rawArea?.active_months || []) as (number | string)[];
  const headerPeriodText = formatVigilancePeriod({
    startDate: startDateStr,
    endDate: endDateStr,
    activeDays,
    activeMonths,
    intl,
    isHeader: true,
  });

  const detailPeriodText = formatVigilancePeriod({
    startDate: startDateStr,
    endDate: endDateStr,
    activeDays,
    activeMonths,
    intl,
    isHeader: false,
  });

  // Practicability label (Only display restrictions: Impraticable or Praticable sous conditions)
  let practicabilityText = '';
  if (isClosed) {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityClosed',
      defaultMessage: 'Impraticable / Interdit d’accès',
    });
  } else if (
    area?.practicability === 'conditions' ||
    area?.practicability === 'under_condition_practicable'
  ) {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityConditions',
      defaultMessage: 'Praticable sous conditions',
    });
  }

  // Level prefix
  const levelText = intl.formatMessage({
    id: `details.vigilanceLevelPrefix.${levelMode}`,
    defaultMessage:
      levelMode === 'closed'
        ? 'Impraticable'
        : levelMode === 'alert'
        ? 'Vigilance élevée'
        : levelMode === 'info'
        ? 'Information'
        : 'Zone de vigilance',
  });

  const { selectedVigilanceAreaId, setSelectedVigilanceAreaId, setHoveredVigilanceAreaId } =
    useDetailsAndMapContext();

  const isOpen = String(selectedVigilanceAreaId) === String(id);

  const toggleOpen = () => {
    setSelectedVigilanceAreaId(isOpen ? null : String(id));
  };

  const itemColor =
    (rawArea?.color as string) ||
    ((rawArea?.level as Record<string, unknown> | null)?.color as string) ||
    (isRedVariant ? 'var(--color-vigilance-closed)' : 'var(--color-vigilance-warning)');

  const itemBgColor = `color-mix(in srgb, ${itemColor} 10%, white)`;

  return (
    <div
      id={`details_vigilanceArea_${id}`}
      onMouseEnter={() => setHoveredVigilanceAreaId(String(id))}
      onMouseLeave={() => setHoveredVigilanceAreaId(null)}
      style={{ borderColor: itemColor }}
      className={cn(
        'rounded-xl border-2 border-solid overflow-hidden transition-all duration-200',
        className,
      )}
    >
      {/* Accordion Header */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`vigilance-body-${id}`}
        style={{ backgroundColor: itemBgColor }}
        className="w-full p-4 desktop:px-5 flex items-start justify-between gap-3 text-left hover:brightness-95 transition-all cursor-pointer"
      >
        <div className="flex items-start gap-3 min-w-0">
          {/* Badge */}
          <VigilanceAreaBadge
            typePictogramUrl={typePicto}
            levelPictogramUrl={levelPicto}
            levelMode={levelMode}
            isClosed={isClosed}
            size={32}
          />

          {/* Vertical Text Stack */}
          <div className="min-w-0 flex flex-col gap-0.5">
            {/* Line 1: Level — Type */}
            <p
              style={{ color: itemColor }}
              className={cn('text-xs font-bold m-0')}
            >
              {levelText}
              {typeName ? ` — ${typeName}` : ''}
            </p>

            {/* Line 2: Title */}
            {title && (
              <h3 className="font-bold text-greyDarkColored mt-0.5 text-base m-0">
                {title}
              </h3>
            )}

            {/* Line 3: Practicability */}
            {practicabilityText && (
              <p
                style={{ color: itemColor }}
                className={cn('text-xs font-bold mt-0.5 m-0')}
              >
                {practicabilityText}
              </p>
            )}

            {/* Line 4: Dates / Period */}
            {headerPeriodText && (
              <p className="text-xs text-greyDarkColored mt-0.5 m-0">
                {headerPeriodText}
              </p>
            )}
          </div>
        </div>

        {/* Chevron Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={cn(
            'shrink-0 text-greyDarkColored transition-transform duration-200 mt-1',
            isOpen && 'rotate-180',
          )}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div
          id={`vigilance-body-${id}`}
          className="p-4 desktop:px-5 desktop:pb-5 bg-white space-y-4 text-sm text-greyDarkColored border-t border-solid"
          style={{ borderColor: itemBgColor }}
        >
          {/* 1. Description */}
          {Boolean(description) && (
            <div className="content-WYSIWYG leading-relaxed">
              {typeof description === 'string' ? parse(description) : null}
            </div>
          )}

          {/* 2. Recommandations */}
          {Boolean(practicalInfo) && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage
                  id="details.vigilanceRecommendations"
                  defaultMessage="Recommandations :"
                />
              </h4>
              <div className="content-WYSIWYG leading-relaxed">
                {typeof practicalInfo === 'string' ? parse(practicalInfo) : null}
              </div>
            </div>
          )}

          {/* 3. Praticabilité */}
          {practicabilityText && (
            <p className="m-0">
              <span className="font-bold">
                <FormattedMessage
                  id="details.vigilancePracticabilityTitle"
                  defaultMessage="Praticabilité :"
                />
              </span>{' '}
              {practicabilityText}
            </p>
          )}

          {/* 4. Période(s) concernée(s) : */}
          {detailPeriodText && (
            <p className="m-0">
              <span className="font-bold">
                <FormattedMessage
                  id="details.vigilancePeriod"
                  defaultMessage="Période(s) concernée(s) :"
                />
              </span>{' '}
              {detailPeriodText}
            </p>
          )}

          {/* 5. Plus d'informations sur le sujet : */}
          {files && files.length > 0 && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage
                  id="details.vigilanceMoreInfo"
                  defaultMessage="Plus d’informations sur le sujet :"
                />
              </h4>
              <div className="flex flex-col gap-1 text-xs text-greyDarkColored">
                {files.map((file: FileFromAttachment, i: number) => {
                  const fileExtension = file.url.split('.').pop()?.toUpperCase();
                  const fileName = file.fileName || file.legend || `Document ${i + 1}`;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Paperclip size={14} className="shrink-0 text-greyDarkColored" aria-hidden />
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="underline text-primary1 hover:text-primary1-light break-all"
                      >
                        {fileName}
                      </a>
                      {fileExtension && (
                        <span className="py-0.5 px-1.5 rounded-full bg-greyDarkColored text-white text-[10px] uppercase shrink-0">
                          {fileExtension}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. En savoir plus */}
          {externalUrl && (
            <div>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary1 font-semibold underline hover:opacity-80 transition-opacity"
              >
                <FormattedMessage id="details.knowMore" defaultMessage="En savoir plus" />
                <span>→</span>
              </a>
            </div>
          )}

          {/* 7. Source(s) */}
          {sources && sources.length > 0 && (
            <p className="m-0">
              <span className="font-bold">
                <FormattedMessage id="details.vigilanceSources" defaultMessage="Source :" />
              </span>{' '}
              {sources.map((src: Source, i: number) => (
                <React.Fragment key={i}>
                  {i > 0 && ' — '}
                  {src.website ? (
                    <a
                      href={src.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary1 hover:text-primary1-light font-medium"
                    >
                      {src.name}
                    </a>
                  ) : (
                    <span>{src.name}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* 8. Date de mise à jour */}
          {updateDatetime && (
            <p className="text-xs italic text-greyDarkColored/70 pt-2 m-0">
              <FormattedMessage id="details.vigilanceUpdated" defaultMessage="Mis à jour le" />{' '}
              <FormattedDate value={updateDatetime} year="numeric" month="long" day="numeric" />
            </p>
          )}
        </div>
      )}
    </div>
  );
};
