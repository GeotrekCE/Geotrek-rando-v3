import { getViewPointMetadata } from './connector';
import { RawViewPoint, ViewPoint } from './interface';

export const adaptViewPoints = async (rawViewpoints: RawViewPoint[]): Promise<ViewPoint[]> => {
  if (rawViewpoints.length === 0) {
    return [];
  }
  const viewPoints = await Promise.all(
    rawViewpoints.map(async viewpoint => {
      const metadata = await getViewPointMetadata(viewpoint.metadata_url);
      return {
        annotations: viewpoint.annotations,
        id: String(viewpoint.id),
        author: viewpoint.author,
        geometry: viewpoint.geometry ?? null,
        legend: viewpoint.legend,
        license: viewpoint.license,
        metadata,
        pictureTilesUrl: decodeURI(viewpoint.picture_tiles_url),
        title: viewpoint.title,
        thumbnailUrl: viewpoint.thumbnail_url,
      };
    }),
  );

  return viewPoints.filter(({ metadata, pictureTilesUrl }) => metadata && pictureTilesUrl);
};
