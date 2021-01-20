import { Layout } from 'components/Layout/Layout';
import { Details } from 'modules/details/interface';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { DetailsSection } from './components/DetailsSection/DetailsSection';
import { useDetails } from './useDetails';
interface Props {
  detailsId: string | string[] | undefined;
}

const fieldIsValid = (field: string | undefined): field is string =>
  field !== undefined && field.length > 0;

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const { details } = useDetails(detailsId);
  const transport = details?.transport;
  const access_parking = details?.access_parking;
  return (
    <Layout>
      <div className="flex flex-1">
        <div className="flex flex-col w-full desktop:w-3/5">
          <img
            src={details?.imgUrl}
            className="object-cover object-center overflow-hidden
            h-coverDetailsMobile desktop:h-coverDetailsDesktop"
          />
          <div
            className="px-4 desktop:px-18 desktop:py-0
            desktop:relative desktop:-top-9
            flex flex-col"
          >
            {details?.practice?.pictogram !== undefined && (
              <ActivityLogo src={details?.practice?.pictogram} />
            )}
            <span
              className="text-Mobile-C2 desktop:text-P1
              mt-4 desktop:mt-12"
            >
              {details?.place}
            </span>
            <span className="text-primary1 text-Mobile-H1 desktop:text-H1 font-bold">
              {details?.title}
            </span>
            {fieldIsValid(transport) && (
              <DetailsSection titleId="details.transport" text={transport} />
            )}
            {fieldIsValid(access_parking) && (
              <DetailsSection titleId="details.access_parking" text={access_parking} />
            )}
          </div>
        </div>
        <div className="desktop:flex-1 bg-greySoft h-screen" />
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
