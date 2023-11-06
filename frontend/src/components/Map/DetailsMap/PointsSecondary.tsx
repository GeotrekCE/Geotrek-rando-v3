import { useMemo } from 'react';
import Image from 'next/image';
import { Tooltip } from 'react-leaflet';
import { Signage } from 'components/Icons/Signage';
import { renderToStaticMarkup } from 'react-dom/server';
import { SignageDictionary } from 'modules/signage/interface';
import { RawCoordinate2D } from 'modules/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { FormattedMessage } from 'react-intl';
import { HoverableMarker } from '../components/HoverableMarker';

export type PointsSecondaryProps = {
  dictionary?: SignageDictionary | InfrastructureDictionary | null;
  icon?: React.FC;
};

type Locations = {
  accessibility?: string | null;
  description: string;
  name: string;
  imageUrl: string | null;
  pictogramUri: string;
  position: RawCoordinate2D;
  type: string;
}[];

export const PointsSecondary: React.FC<PointsSecondaryProps> = ({
  dictionary,
  icon: Icon = Signage,
}) => {
  const locations: Locations = useMemo(() => {
    return Object.values(dictionary ?? {})
      .filter(({ geometry }) => Boolean(geometry?.coordinates))
      .map(({ accessibility, description, geometry, name, type, imageUrl }) => ({
        accessibility,
        description,
        imageUrl,
        name,
        pictogramUri: type.pictogram ?? renderToStaticMarkup(<Icon color="white" />),
        position: [geometry.coordinates[1], geometry.coordinates[0]],
        type: type.label,
      }));
  }, [Icon, dictionary]);

  if (locations.length === 0) {
    return null;
  }

  return (
    <>
      {locations.map((location, index: number) => (
        <HoverableMarker
          id={location.position.join('')}
          key={index}
          position={location.position}
          pictogramUri={location.pictogramUri}
          type={null}
        >
          <Tooltip className="!p-0 !border-0 !rounded-xl !overflow-hidden w-55 desktop:w-70 !whitespace-normal">
            <div className="flex flex-col">
              {location.imageUrl !== null && (
                <Image
                  loading="lazy"
                  className="h-40 w-auto desktop:h-30 object-cover"
                  width={300}
                  height={130}
                  src={location.imageUrl}
                  alt=""
                />
              )}
              <div className="p-4">
                <div className="text-P2 mb-1 text-greyDarkColored">{location.type}</div>
                <h3 className="text-Mobile-C1 text-primary1 font-bold desktop:text-H4 line-clamp-2">
                  {location.name}
                </h3>
                {Boolean(location.description) && (
                  <p
                    className="text-P2 my-2"
                    dangerouslySetInnerHTML={{
                      __html: location.description,
                    }}
                  />
                )}
                {Boolean(location.accessibility) && (
                  <p className="text-P2 my-2">
                    <strong className="font-bold">
                      <FormattedMessage id="details.accessibility" /> :
                    </strong>{' '}
                    {location.accessibility}
                  </p>
                )}
              </div>
            </div>
          </Tooltip>
        </HoverableMarker>
      ))}
    </>
  );
};
