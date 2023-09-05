import { getViewPointMetadata } from './connector';
import { RawViewPoint, ViewPoint } from './interface';

export const adaptViewPoints = async (rawViewpoints: RawViewPoint[]): Promise<ViewPoint[]> => {
  if (rawViewpoints.length === 0) {
    return [];
  }
  const viewPoints = await Promise.all(
    rawViewpoints.map(async viewpoints => {
      const metadata = await getViewPointMetadata(viewpoints.metadata_url);
      return {
        annotations: viewpoints.annotations,
        id: String(viewpoints.id),
        author: viewpoints.author,
        legend: viewpoints.legend,
        license: viewpoints.license,
        metadata,
        pictureTilesUrl: decodeURI(viewpoints.picture_tiles_url),
        title: viewpoints.title,
        thumbnailUrl: viewpoints.thumbnail_url,
      };
    }),
  );

  return viewPoints.filter(({ metadata, pictureTilesUrl }) => metadata && pictureTilesUrl);
};
