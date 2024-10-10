import { getViewPointCategories, getViewPointMetadata } from './connector';
import { RawViewPoint, RawViewPointCategories, ViewPoint, ViewPointCategories } from './interface';

export const adaptViewPointsCategories = (
  viewPointsCategories: RawViewPointCategories[],
): ViewPointCategories =>
  Object.fromEntries(
    viewPointsCategories.map(({ pictogram, ...item }) => [
      item.id,
      { ...item, pictogramUri: pictogram },
    ]),
  );

export const adaptViewPoints = async (
  language: string,
  rawViewpoints: RawViewPoint[],
): Promise<ViewPoint[]> => {
  if (rawViewpoints.length === 0) {
    return [];
  }
  const viewPoints = await Promise.all(
    rawViewpoints.map(async viewpoint => {
      const [metadata, categories] = await Promise.all([
        getViewPointMetadata(viewpoint.metadata_url),
        getViewPointCategories(language),
      ]);
      return {
        annotations: {
          ...viewpoint.annotations,
          features:
            viewpoint.annotations.features?.map(feature => ({
              ...feature,
              properties: {
                ...feature.properties,
                category: categories?.[feature.properties?.category] || null,
              },
            })) ?? [],
        },
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
