import { ViewPoint } from 'modules/viewPoint/interface';
import { renderToStaticMarkup } from 'react-dom/server';
import { ViewPoint as ViewPointIcon } from 'components/Icons/ViewPoint';
import { ClickableMarker } from 'components/Map/components/ClickableMarker';
import { useIntl } from 'react-intl';

interface ViewPointMarkersProps {
  viewPoints?: ViewPoint[];
  setMapId?: (id: string) => void;
}

export const ViewPointMarkers = ({ viewPoints, setMapId }: ViewPointMarkersProps) => {
  const intl = useIntl();

  if (!viewPoints?.length) {
    return null;
  }

  const points = viewPoints
    .filter(({ geometry }) => geometry !== null)
    .map(({ id, geometry, title, thumbnailUrl }) => ({
      id: `DETAILS-VIEWPOINT-${id}`,
      // @ts-expect-error geometry cannot be null because it's filtered above
      location: { x: geometry.coordinates[0], y: geometry.coordinates[1] },
      name: title,
      pictogramUri: renderToStaticMarkup(<ViewPointIcon color="white" />),
      content: {
        imgUrl: thumbnailUrl,
        place: intl.formatMessage({ id: 'viewPoint.label' }),
        title: title ?? '',
        button: {
          onClick: () => {
            setMapId?.(id);
          },
          label: 'viewPoint.displayPicture',
        },
      },
    }));

  return <ClickableMarker points={points} />;
};

export default ViewPointMarkers;
