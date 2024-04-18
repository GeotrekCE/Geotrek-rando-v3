import { useId, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import { FileFromAttachment } from 'modules/interface';
import { cn } from 'services/utils/cn';
import { Minus } from 'components/Icons/Minus';
import { Plus } from 'components/Icons/Plus';
import { Download } from 'components/Icons/Download';

interface DetailsDetailsFilesProps {
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
}) => {
  const SubTitleTag = TitleTag === 'h2' ? 'h3' : 'h4';

  const id = useId();
  const [isOpen, setOpen] = useState(true);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className={cn(className, asAccordion && 'p-4 bg-neutral-100')}>
      <TitleTag
        className={cn(
          'relative flex items-center justify-start gap-1 font-bold',
          TitleTag === 'h2' ? 'text-Mobile-H1 desktop:text-H2' : 'text-Mobile-C1 desktop:text-H4',
        )}
      >
        <Download size={30} aria-hidden />
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
        )}
      >
        {files.map((file, index) => {
          const legend = [file.legend, file.author].filter(Boolean).join(' - ');
          const fileExtension = file.url.split('.').pop();

          return (
            <li
              key={index}
              className="shrink-0 relative desktop:flex w-60 desktop:w-auto border-l desktop:border-l-0 desktop:border-t first:border-0 border-solid border-greySoft pl-5 desktop:pl-0 desktop:pt-5"
            >
              <div className="flex flex-col gap-4 desktop:flex-row items-center justify-between w-full">
                <div>
                  <SubTitleTag className="flex flex-wrap gap-4 justify-center">
                    {file.fileName && (
                      <span className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold break-all">
                        {file.fileName}
                      </span>
                    )}
                    <span className="py-1 px-2 rounded-full  bg-primary2 text-sm desktop:text-base">
                      {file.fileType}
                    </span>
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
