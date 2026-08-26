import React, { useState } from 'react';
import parse from 'html-react-parser';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { FileFromAttachment } from 'modules/interface';
import { Source } from 'modules/source/interface';
import { formatVigilancePeriod } from 'modules/vigilanceArea/utils';
import { cn } from 'services/utils/cn';
import { Paperclip } from 'components/Icons/Paperclip';
import { VigilanceAreaBadge } from './VigilanceAreaBadge';

interface VigilanceAreaItemProps {
  area: Record<string, any>;
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
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const intl = useIntl();

  const id = area?.id ?? `area-${index}`;
  const title = area?.title ?? area?.name ?? '';

  // Extract type label and pictogram
  const typeObj = area?.type ?? area?.vigilance_area_type;
  const typeName =
    typeof typeObj === 'object' && typeObj !== null
      ? typeObj.label ?? typeObj.name ?? ''
      : area?.type_name ?? (typeof typeObj === 'string' ? typeObj : '');
  const typePicto =
    typeof typeObj === 'object' && typeObj !== null
      ? typeObj.pictogramUrl ?? typeObj.pictogram ?? typeObj.pictogramUri ?? null
      : area?.typePictogramUrl ?? area?.pictogramUrl ?? area?.pictogram ?? null;

  const levelPicto = area?.level?.pictogramUrl ?? area?.level?.pictogram ?? area?.levelPictogramUrl ?? null;

  // Determine criticality / level
  const isClosed =
    area?.practicability === 'closed' ||
    area?.practicability === 'not_practicable' ||
    area?.closed === true;
  const levelNum = typeof area?.level === 'object' && area?.level !== null ? area.level.level : area?.level;

  let levelMode: 'closed' | 'alert' | 'vigilance' | 'info' = 'vigilance';
  if (isClosed) {
    levelMode = 'closed';
  } else if (area?.criticality === 'alert' || area?.criticality === 'high' || levelNum === 1 || levelNum === '1') {
    levelMode = 'alert';
  } else if (area?.criticality === 'info' || levelNum === 3 || levelNum === '3') {
    levelMode = 'info';
  }

  const isRedVariant = levelMode === 'closed' || levelMode === 'alert';

  // Dates
  const startDateStr = area?.startDate ?? area?.start_date;
  const endDateStr = area?.endDate ?? area?.end_date;

  // Description & Info
  const description = area?.description ?? '';
  const practicalInfo = area?.practicalInfo ?? area?.practical_info ?? '';
  const externalUrl = area?.externalInfoUrl ?? area?.external_info_url ?? null;
  const updateDatetimeStr = area?.updateDatetime ?? area?.update_datetime ?? null;
  const updateDatetime =
    typeof updateDatetimeStr === 'string' || typeof updateDatetimeStr === 'number' || updateDatetimeStr instanceof Date
      ? new Date(updateDatetimeStr)
      : null;
  const sources = area?.sources || [];
  const files: FileFromAttachment[] = area?.attachments || [];
  const activeDays = area?.activeDays || area?.active_days || [];
  const activeMonths = area?.activeMonths || area?.active_months || [];
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

  const { setHoveredVigilanceAreaId } = useDetailsAndMapContext();

  const itemColor =
    area?.color ||
    area?.level?.color ||
    (isRedVariant ? 'var(--color-vigilance-closed)' : 'var(--color-vigilance-warning)');

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
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`vigilance-body-${id}`}
        className="w-full p-4 desktop:px-5 flex items-start justify-between gap-3 text-left bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
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
          className="p-4 desktop:px-5 desktop:pb-5 bg-white space-y-4 text-sm text-greyDarkColored"
        >
          {/* 1. Description */}
          {Boolean(description) && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage id="details.description" defaultMessage="Description" />
              </h4>
              <div className="content-WYSIWYG">
                {typeof description === 'string' ? parse(description) : null}
              </div>
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
              <div className="content-WYSIWYG">
                {typeof practicalInfo === 'string' ? parse(practicalInfo) : null}
              </div>
            </div>
          )}

          {/* 3. Praticabilité (displayed only if not practicable) */}
          {practicabilityText && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage
                  id="details.vigilancePracticabilityTitle"
                  defaultMessage="Praticabilité :"
                />
              </h4>
              <p className="m-0 font-semibold" style={{ color: itemColor }}>
                {practicabilityText}
              </p>
            </div>
          )}

          {/* 4. Période(s) concernée(s) : */}
          {detailPeriodText && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage
                  id="details.vigilancePeriod"
                  defaultMessage="Période(s) concernée(s) :"
                />
              </h4>
              <p className="m-0">{detailPeriodText}</p>
            </div>
          )}

          {/* 5. Source : */}
          {sources && sources.length > 0 && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage id="details.vigilanceSources" defaultMessage="Source :" />
              </h4>
              <div className="flex flex-col gap-1 text-xs text-greyDarkColored">
                {sources.map((src: Source, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    {src.pictogramUri && (
                      <img src={src.pictogramUri} alt="" className="w-4 h-4 object-contain shrink-0" />
                    )}
                    {src.website ? (
                      <a
                        href={src.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary1 hover:text-primary1-light"
                      >
                        {src.name}
                      </a>
                    ) : (
                      <span>{src.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Plus d'informations sur le sujet : */}
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

          {/* 7. En savoir plus */}
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

          {/* 8. Mis à jour le : */}
          {updateDatetime && (
            <div className="text-xs text-greyDarkColored/60 pt-2 border-t border-solid border-greySoft/30">
              <FormattedMessage id="details.vigilanceUpdated" defaultMessage="Mis à jour le :" />{' '}
              <FormattedDate value={updateDatetime} year="numeric" month="long" day="numeric" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
