import React from 'react';
import parse from 'html-react-parser';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { FileFromAttachment } from 'modules/interface';
import { Source } from 'modules/source/interface';
import { VigilanceArea, VigilancePeriod } from 'modules/vigilanceArea/interface';
import { formatSinglePeriod, formatVigilancePeriod, getLevelMode } from 'modules/vigilanceArea/utils';
import { cn } from 'services/utils/cn';
import { Paperclip } from 'components/Icons/Paperclip';
import { VigilanceAreaBadge } from './VigilanceAreaBadge';

interface VigilanceAreaItemProps {
  area: VigilanceArea;
  index?: number;
  className?: string;
}

export const VigilanceAreaItem: React.FC<VigilanceAreaItemProps> = ({
  area,
  index = 0,
  className,
}) => {
  const intl = useIntl();

  const id = area.id ?? `area-${index}`;
  const title = area.name ?? '';

  // Extract type label and pictogram
  const typeName = area.type?.name ?? '';
  const typePicto = area.type?.pictogramUrl ?? null;

  const levelObj = area.level ?? null;
  const levelPicto = levelObj?.pictogramUrl ?? null;
  const levelNumber = levelObj?.level ?? null;
  const criticality = getLevelMode(levelNumber, area.criticality);

  // Determine impracticability
  const isImpracticable = Boolean(area.isImpracticable);

  // Level text: API level name or "Impraticable" or empty
  const levelText = isImpracticable
    ? intl.formatMessage({
        id: 'details.vigilancePracticabilityClosed',
        defaultMessage: 'Impraticable',
      })
    : levelObj?.name ?? '';

  const defaultLevelColor =
    levelNumber === 1
      ? '#901A1A'
      : levelNumber === 2
      ? '#955a02'
      : levelNumber === 3
      ? '#1257A8'
      : '#d17a00';

  // Strict colors: red #901A1A if impracticable, otherwise level color or fallback #d17a00
  const itemColor = isImpracticable
    ? '#901A1A'
    : area.color || levelObj?.color || defaultLevelColor;

  const itemBgColor = isImpracticable
    ? 'color-mix(in srgb, #901A1A 8%, white)'
    : `color-mix(in srgb, ${itemColor} 10%, white)`;

  // Periods extraction
  const periods: VigilancePeriod[] = area.periods ?? [];

  const headerPeriodText = formatVigilancePeriod({
    periods,
    intl,
    isHeader: true,
  });

  const detailSinglePeriodText =
    periods.length === 1
      ? formatSinglePeriod({
          startDate: periods[0].startDate,
          endDate: periods[0].endDate,
          activeDays: periods[0].activeDays,
          annual: periods[0].annual,
          intl,
        })
      : null;

  // Description & Info
  const description = area.description ?? '';
  const practicalInfo = area.practicalInfo ?? '';
  const externalUrl = area.externalInfoUrl ?? null;
  const updateDatetime = area.updateDatetime ? new Date(area.updateDatetime) : null;
  const sources = area.sources ?? [];
  const files = area.attachments ?? [];

  const { selectedVigilanceAreaId, setSelectedVigilanceAreaId, setHoveredVigilanceAreaId } =
    useDetailsAndMapContext();

  const isOpen = String(selectedVigilanceAreaId) === String(id);

  const toggleOpen = () => {
    setSelectedVigilanceAreaId(isOpen ? null : String(id));
  };

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
            levelMode={criticality}
            levelNumber={levelNumber}
            isImpracticable={isImpracticable}
            size={32}
          />

          {/* Vertical Text Stack */}
          <div className="min-w-0 flex flex-col gap-0.5">
            {/* Line 1: Level — Type */}
            {(levelText || typeName) && (
              <p
                style={{ color: itemColor }}
                className={cn('text-xs font-bold m-0')}
              >
                {levelText && typeName ? `${levelText} — ${typeName}` : levelText || typeName}
              </p>
            )}

            {/* Line 2: Title */}
            {title && (
              <h3 className="font-bold text-greyDarkColored mt-0.5 text-base m-0">
                {title}
              </h3>
            )}

            {/* Line 3: Dates / Period summary */}
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

          {/* 2. Praticabilité de la zone (affiché uniquement si impraticable) */}
          {isImpracticable && (
            <p className="m-0">
              <span className="font-bold">
                <FormattedMessage
                  id="details.vigilancePracticabilityTitle"
                  defaultMessage="Praticabilité de la zone :"
                />
              </span>{' '}
              {intl.formatMessage({
                id: 'details.vigilancePracticabilityClosed',
                defaultMessage: 'Impraticable',
              })}
            </p>
          )}

          {/* 4. Période(s) concernée(s) */}
          {periods.length > 1 ? (
            <div>
              <p className="font-bold m-0">
                <FormattedMessage
                  id="details.vigilancePeriod"
                  defaultMessage="Période(s) concernée(s) :"
                />
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
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
          ) : detailSinglePeriodText ? (
            <p className="m-0">
              <span className="font-bold">
                <FormattedMessage
                  id="details.vigilancePeriod"
                  defaultMessage="Période(s) concernée(s) :"
                />
              </span>{' '}
              {detailSinglePeriodText}
            </p>
          ) : null}

          {/* 4. Plus d'informations sur le sujet : */}
          {(Boolean(practicalInfo) || (files && files.length > 0)) && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage
                  id="details.vigilanceMoreInfo"
                  defaultMessage="Plus d’informations sur le sujet :"
                />
              </h4>
              {Boolean(practicalInfo) && (
                <div className="content-WYSIWYG leading-relaxed">
                  {typeof practicalInfo === 'string' ? parse(practicalInfo) : null}
                </div>
              )}
              {files && files.length > 0 && (
                <div className={cn('flex flex-col gap-1 text-xs text-greyDarkColored', Boolean(practicalInfo) && 'mt-2')}>
                  {files.map((file: FileFromAttachment, fileIndex: number) => {
                    const fileExtension = file.url.split('.').pop()?.toUpperCase();
                    const fileName = file.fileName || file.legend || `Document ${fileIndex + 1}`;
                    return (
                      <div key={fileIndex} className="flex items-center gap-2">
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
              )}
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
              {sources.map((source: Source, sourceIndex: number) => (
                <React.Fragment key={sourceIndex}>
                  {sourceIndex > 0 && ' — '}
                  {source.website ? (
                    <a
                      href={source.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary1 hover:text-primary1-light font-medium"
                    >
                      {source.name}
                    </a>
                  ) : (
                    <span>{source.name}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* 8. Date de mise à jour */}
          {updateDatetime && (
            <p className="text-xs italic text-greyDarkColored/70 pt-2 m-0">
              <FormattedMessage id="details.vigilanceUpdated" defaultMessage="Dernière mise à jour le" />{' '}
              <FormattedDate value={updateDatetime} year="numeric" month="long" day="numeric" />
            </p>
          )}
        </div>
      )}
    </div>
  );
};
