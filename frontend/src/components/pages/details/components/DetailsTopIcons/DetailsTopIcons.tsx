import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor, sizes } from 'stylesheet';

interface DetailsTopIconsProps {
  className?: string;
  practice?: Practice;
}

export const DetailsTopIcons: React.FC<DetailsTopIconsProps> = ({ className }) => {
  return (
    <div className={`${className ?? ''} flex flex-col`}>
      <div className="flex justify-between items-center">
        {practice?.pictogram !== undefined && <ActivityLogo src={details?.practice?.pictogram} />}
        <div className="hidden desktop:flex">
          {details?.pdfUri !== undefined && (
            <DetailsButton url={details.pdfUri}>
              <Printer size={30} />
            </DetailsButton>
          )}
        </div>
      </div>
    </div>
  );
};

const ActivityLogo: React.FC<{ src: string }> = ({ src }) => (
  <div
    className="h-18 w-18 rounded-full
      hidden desktop:flex items-center justify-center
      shadow-md
    bg-primary1"
  >
    <SVG src={src} preProcessor={fillSvgWithColor(colorPalette.white)} height={53} width={53} />
  </div>
);
