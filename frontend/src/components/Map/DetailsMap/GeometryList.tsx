import { GeometryListProps } from './DetailsMap';
import { GeometryItem } from './GeometryItem';

export type PropsType = {
  contents?: GeometryListProps[];
  type?: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT' | 'OUTDOOR_COURSE';
};

export const GeometryList = ({ contents, type = 'TOURISTIC_CONTENT' }: PropsType) => {
  if (contents === undefined) {
    return null;
  }
  return (
    <>
      {contents.map(props => (
        <GeometryItem key={props.id} type={type} {...props} />
      ))}
    </>
  );
};
