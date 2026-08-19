import React, { useState } from 'react';
import parse from 'html-react-parser';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { VigilanceAreaBadge } from './VigilanceAreaBadge';
import { cn } from 'services/utils/cn';

interface VigilanceAreaItemProps {
  area: any;
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
  const pictogram =
    typeof typeObj === 'object' && typeObj !== null
      ? typeObj.pictogramUrl ?? typeObj.pictogram ?? typeObj.pictogramUri ?? null
      : area?.pictogramUrl ?? area?.pictogram ?? null;

  // Determine criticality / level
  const rawLevel = area?.criticality ?? area?.level;
  const isClosed = area?.practicability === 'closed' || area?.closed === true;

  let levelMode: 'closed' | 'alert' | 'vigilance' | 'info' = 'vigilance';
  if (isClosed) {
    levelMode = 'closed';
  } else if (rawLevel === 'alert' || rawLevel === 'high' || rawLevel === '3') {
    levelMode = 'alert';
  } else if (rawLevel === 'info' || rawLevel === '1') {
    levelMode = 'info';
  }

  const isRedVariant = levelMode === 'closed' || levelMode === 'alert';

  // Dates
  const startDateStr = area?.startDate ?? area?.start_date;
  const endDateStr = area?.endDate ?? area?.end_date;
  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;

  // Description & Info
  const description = area?.description ?? '';
  const practicalInfo = area?.practicalInfo ?? area?.practical_info ?? '';
  const externalUrl = area?.externalInfoUrl ?? area?.external_info_url ?? null;
  const updateDatetimeStr = area?.updateDatetime ?? area?.update_datetime ?? null;
  const updateDatetime = updateDatetimeStr ? new Date(updateDatetimeStr) : null;

  // Practicability label
  let practicabilityText = '';
  if (isClosed) {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityClosed',
      defaultMessage: 'Fermé / Interdit d’accès',
    });
  } else if (area?.practicability === 'conditions') {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityConditions',
      defaultMessage: 'Praticable sous conditions',
    });
  } else if (area?.practicability === 'practicable') {
    practicabilityText = intl.formatMessage({
      id: 'details.vigilancePracticabilityPracticable',
      defaultMessage: 'Praticable',
    });
  }

  // Level prefix
  const levelText = intl.formatMessage({
    id: `details.vigilanceLevelPrefix.${levelMode}`,
    defaultMessage:
      levelMode === 'closed'
        ? 'Fermeture d’itinéraire'
        : levelMode === 'alert'
        ? 'Vigilance élevée'
        : levelMode === 'info'
        ? 'Information'
        : 'Zone de vigilance',
  });

  const { setHoveredVigilanceAreaId } = useDetailsAndMapContext();

  return (
    <div
      id={`details_vigilanceArea_${id}`}
      onMouseEnter={() => setHoveredVigilanceAreaId(id)}
      onMouseLeave={() => setHoveredVigilanceAreaId(null)}
      className={cn(
        'rounded-xl border-2 border-solid overflow-hidden transition-all duration-200',
        isRedVariant
          ? 'border-[var(--color-vigilance-closed)]'
          : 'border-[var(--color-vigilance-warning)]',
        className,
      )}
    >
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`vigilance-body-${id}`}
        className={cn(
          'w-full p-4 desktop:p-5 flex items-start justify-between gap-3 text-left transition-colors focus:outline-none',
          isRedVariant
            ? 'bg-[color-mix(in_srgb,var(--color-vigilance-closed)_10%,white)] hover:bg-[color-mix(in_srgb,var(--color-vigilance-closed)_15%,white)]'
            : 'bg-[color-mix(in_srgb,var(--color-vigilance-warning)_10%,white)] hover:bg-[color-mix(in_srgb,var(--color-vigilance-warning)_15%,white)]',
        )}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {/* Pictogram or 32x32 SVG Badge */}
          <VigilanceAreaBadge
            pictogramUrl={pictogram}
            levelMode={levelMode}
            isClosed={isClosed}
            size={32}
          />

          {/* Vertical Text Stack */}
          <div className="min-w-0 flex flex-col gap-0.5">
            {/* Line 1: Level — Type */}
            <p
              className={cn(
                'text-xs font-bold m-0',
                isRedVariant ? 'text-vigilanceClosed' : 'text-vigilanceWarning',
              )}
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
                className={cn(
                  'text-xs font-bold mt-0.5 m-0',
                  isRedVariant ? 'text-vigilanceClosed' : 'text-vigilanceWarning',
                )}
              >
                {practicabilityText}
              </p>
            )}

            {/* Line 4: Dates / Period */}
            {(startDate || endDate) && (
              <p className="text-xs text-greyDarkColored mt-0.5 m-0">
                {startDate && (
                  <>
                    <FormattedMessage id="details.forThe" defaultMessage="Du" />{' '}
                    <FormattedDate value={startDate} year="numeric" month="long" day="numeric" />
                  </>
                )}
                {startDate && endDate && ' '}
                {endDate && (
                  <>
                    <FormattedMessage id="details.toThe" defaultMessage="au" />{' '}
                    <FormattedDate value={endDate} year="numeric" month="long" day="numeric" />
                  </>
                )}
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
          {/* Description */}
          {description && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage id="details.description" defaultMessage="Description" />
              </h4>
              <div className="content-WYSIWYG">{parse(description)}</div>
            </div>
          )}

          {/* Practical Info */}
          {practicalInfo && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage id="details.vigilancePracticalInfo" defaultMessage="Informations pratiques :" />
              </h4>
              <div className="content-WYSIWYG">{parse(practicalInfo)}</div>
            </div>
          )}

          {/* Period Details */}
          {(startDate || endDate) && (
            <div>
              <h4 className="font-bold mb-1 text-greyDarkColored">
                <FormattedMessage id="details.vigilancePeriod" defaultMessage="Période d'impact :" />
              </h4>
              <p className="m-0">
                {startDate && (
                  <>
                    <FormattedMessage id="search.filters.forThe" defaultMessage="Du" />{' '}
                    <FormattedDate value={startDate} year="numeric" month="long" day="numeric" />
                  </>
                )}{' '}
                {endDate && (
                  <>
                    <FormattedMessage id="search.filters.toThe" defaultMessage="au" />{' '}
                    <FormattedDate value={endDate} year="numeric" month="long" day="numeric" />
                  </>
                )}
              </p>
            </div>
          )}

          {/* External URL Link */}
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

          {/* Last update date */}
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
