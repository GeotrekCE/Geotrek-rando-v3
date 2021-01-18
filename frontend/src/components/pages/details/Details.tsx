import { Layout } from 'components/Layout/Layout';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { useDetails } from './useDetails';
interface Props {
  detailsId: string;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const id = detailsId.split('-')[1];
  const { details } = useDetails(id);
  return (
    <Layout>
      <div className="flex flex-1">
        <div className="flex flex-col desktop:w-3/4">
          <div className="desktop:h-detailsImageHeightDesktop overflow-hidden">
            <img src={details?.imgUrl} className="bg-cover w-full bg-center" />
          </div>
          <div className="px-4 desktop:px-18">
            {details?.practice?.pictogram !== undefined ? (
              <SVG
                src={details?.practice?.pictogram}
                preProcessor={fillSvgWithColor(colorPalette.primary1)}
                className="h-10"
              />
            ) : null}
            <span className="text-primary1 text-H1 font-bold">{details?.title}</span>
          </div>
        </div>
        <div className="desktop:flex-1 bg-greySoft" />
      </div>
    </Layout>
  );
};
