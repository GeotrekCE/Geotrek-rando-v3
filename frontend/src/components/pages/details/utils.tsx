import parse from 'html-react-parser';
import { Details, DetailsString } from 'modules/details/interface';

export const checkAndParse = (
  details: Details | undefined,
  field: keyof DetailsString,
): [boolean, string | JSX.Element | JSX.Element[]] => {
  const isValid =
    details !== undefined && details[field] !== undefined && details[field].length > 0;
  const content = details !== undefined ? parse(details[field] ?? '') : '';
  return [isValid, content];
};
