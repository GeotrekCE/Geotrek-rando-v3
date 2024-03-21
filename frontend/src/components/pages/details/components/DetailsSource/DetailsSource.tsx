import Image from 'next/image';
import SVG from 'react-inlinesvg';
import { optimizeAndDefineColor } from 'stylesheet';

interface DetailsSourceProps {
  name: string;
  pictogramUri: string;
  website: string | null;
}

export const DetailsSource: React.FC<DetailsSourceProps> = ({ name, pictogramUri, website }) => {
  return (
    <div id="details_sourceContent" className="flex flex-col desktop:flex-row">
      {pictogramUri !== null && (
        <div
          className="w-30 h-20 desktop:mr-6
          grid place-items-center
          rounded-2xl overflow-hidden"
        >
          <SourceIcon pictogramUri={pictogramUri} />
        </div>
      )}
      <div className="mt-2 desktop:my-auto flex flex-col">
        <span className="text-Mobile-C1 desktop:text-H4 font-bold">{name}</span>
        {website !== null && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary1 underline
          text-P2 desktop:text-P1 mt-1
          hover:text-primary1-light"
          >
            <span>{website}</span>
          </a>
        )}
      </div>
    </div>
  );
};

const SourceIcon: React.FC<{ pictogramUri: string }> = ({ pictogramUri }) => {
  if (RegExp(/(.*).svg/).test(pictogramUri)) {
    return (
      <div className="bg-primary1 size-full">
        <SVG
          src={pictogramUri}
          className="size-full p-1 text-white"
          preProcessor={optimizeAndDefineColor()}
        />
      </div>
    );
  }
  return (
    <Image
      loading="lazy"
      className="object-center object-contain h-20"
      src={pictogramUri}
      alt=""
      width={120}
      height={80}
    />
  );
};
