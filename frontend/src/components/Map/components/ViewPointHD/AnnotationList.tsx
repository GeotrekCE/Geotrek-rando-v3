import { GeoJsonProperties, Geometry } from 'geojson';
import { AnnotationItem } from './AnnotationItem';

export type PropsType = {
  contents?: {
    geometry: Geometry;
    properties: GeoJsonProperties;
  }[];
};

export const AnnotationList = ({ contents, ...props }: PropsType) => {
  if (contents === undefined) {
    return null;
  }

  return (
    <>
      {contents.map((contentProps, index) => (
        <AnnotationItem key={index} id={String(index)} {...contentProps} {...props} />
      ))}
    </>
  );
};
