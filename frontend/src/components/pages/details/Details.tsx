import { Layout } from 'components/Layout/Layout';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { useDetails } from './useDetails';
interface Props {
  detailsId: string | string[] | undefined;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const { details } = useDetails(detailsId);
  return (
    <Layout>
      <div className="flex flex-1">
        <div className="flex flex-col desktop:w-3/5">
          <div className="overflow-hidden h-coverDetailsMobile desktop:h-coverDetailsDesktop">
            <img src={details?.imgUrl} className="bg-cover w-full bg-center" />
          </div>
          <div
            className="px-4 py-4 desktop:px-18 desktop:py-0
            desktop:relative -top-9
            flex flex-col"
          >
            {details?.practice?.pictogram !== undefined && (
              <ActivityLogo src={details?.practice?.pictogram} />
            )}
            <span
              className="text-primary1 text-mobile-H1 desktop:text-H1 font-bold
              desktop:mt-12"
            >
              {details?.title}
            </span>
          </div>
        </div>
        <div className="desktop:flex-1 bg-greySoft" />
      </div>
    </Layout>
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
