import React, { HTMLAttributes } from 'react';
import { cn } from 'services/utils/cn';
import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { useRouter } from 'next/router';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import ToolTip from 'components/ToolTip';
import { useIntl } from 'react-intl';

export const DetailsBackButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({ className }) => {
  const router = useRouter();
  const { previousRouter } = useListAndMapContext();
  const intl = useIntl();

  if (!previousRouter?.asPath.startsWith('/search')) {
    return null;
  }

  return (
    <div className={cn('custo-go-back-button', className)}>
      <ToolTip toolTipText={intl.formatMessage({ id: 'details.goBack' })} invertPosition>
        <button
          type="button"
          className={cn(
            'w-max inline-flex justify-start items-center gap-2 p-2 rounded-full shadow-sm text-primary1 bg-white hover:bg-primary2 transition-colors',
          )}
          onClick={router.back}
        >
          <ArrowLeft size={16} aria-hidden />
          <span className="sr-only">{intl.formatMessage({ id: 'details.goBack' })}</span>
        </button>
      </ToolTip>
    </div>
  );
};
