import { useId, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import { FileFromAttachment } from 'modules/interface';
import { cn } from 'services/utils/cn';
import { Minus } from 'components/Icons/Minus';
import { Plus } from 'components/Icons/Plus';
import { Paperclip } from 'components/Icons/Paperclip';

interface DetailsDetailsFilesProps {
  id?: string;
  className?: string;
  files?: FileFromAttachment[];
  asAccordion?: boolean;
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const DetailsFiles: React.FC<DetailsDetailsFilesProps> = ({
  className,
  files = [],
  asAccordion = false,
  titleTag: TitleTag = 'h2',
  ...props
}) => {
  const SubTitleTag = TitleTag === 'h2' ? 'h3' : 'h4';

  const id = useId();
  const [isOpen, setOpen] = useState(!asAccordion);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className={cn(className, asAccordion && 'p-2 desktop:p-6 bg-neutral-100')} {...props}>
      <TitleTag
        className={cn(
          'relative flex items-center justify-start gap-1 font-bold',
          TitleTag === 'h2' ? 'text-Mobile-H1 desktop:text-H2' : 'text-Mobile-C1 desktop:text-H4',
        )}
      >
        <Paperclip size={30} aria-hidden />
        <FormattedMessage id="attachments.title" values={{ count: files.length }} />
        {asAccordion && (
          <button
            type="button"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls={id}
            className="ml-auto before:content-[''] before:absolute before:inset-0"
            onClick={() => setOpen(prevOpen => !prevOpen)}
          >
            {isOpen ? (
              <>
                <span className="sr-only">
                  <FormattedMessage id="accordion.close" />
                </span>
                <Minus size={24} aria-hidden />
              </>
            ) : (
              <>
                <span className="sr-only">
                  <FormattedMessage id="accordion.open" />
                </span>
                <Plus size={24} aria-hidden />
              </>
            )}
          </button>
        )}
      </TitleTag>
      <ul
        id={id}
        className={cn(
          'flex desktop:flex-col gap-4 border border text-Mobile-C1 desktop:text-P1 mt-4 pb-5 desktop:pb-0 overflow-x-auto overflow-y-hidden desktop:overflow-visible scroll-smooth snap-x',
          !isOpen && 'hidden',
          asAccordion && 'mt-4',
        )}
      >
        {files.map((file, index) => {
          const legend = [file.legend, file.author].filter(Boolean).join(' - ');
          const fileExtension = file.url.split('.').pop();

          return (
            <li
              key={index}
              className={cn(
                'shrink-0 relative p-4 desktop:flex w-50 desktop:w-auto border rounded-lg border-solid border-greySoft bg-white',
              )}
            >
              <div className="flex flex-col gap-4 desktop:flex-row items-center justify-between w-full">
                <div>
                  <SubTitleTag className="flex flex-col gap-1 justify-center desktop:justify-start">
                    <span className="text-P2 mb-1 text-greyDarkColored hidden desktop:block">
                      {file.fileType}
                    </span>
                    {file.fileName && (
                      <span className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold break-all">
                        {file.fileName}
                      </span>
                    )}
                  </SubTitleTag>
                  {legend.length > 0 && (
                    <p className="mt-4 text-greyDarkColored text-sm">
                      <FormattedMessage id="attachments.credit" /> {legend}
                    </p>
                  )}
                </div>
                <Link
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className={cn(`
                    flex justify-center items-center gap-2
                    p-2
                    rounded-xl desktop:rounded-full shadow-sm
                    text-greyDarkColored hover:bg-primary2 focus:bg-primary2 bg-white transition
                    before:content-[''] before:absolute before:inset-0
                    `)}
                >
                  <span>
                    <FormattedMessage id="attachments.download" />
                  </span>
                  {fileExtension && (
                    <span className="py-1 px-2 rounded-full bg-greyDarkColored text-white text-sm desktop:text-base">
                      {fileExtension}
                    </span>
                  )}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
