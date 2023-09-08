import { ORGANIZER_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { RawOrganizer } from './interface';

export const adaptOrganizerFilter = (
  rawOrganizers: RawOrganizer[] | null,
): FilterWithoutType | null => {
  if (rawOrganizers === null) {
    return null;
  }
  return {
    id: ORGANIZER_ID,
    options: rawOrganizers.map(rawOrganizer => ({
      value: `${rawOrganizer.id}`,
      label: rawOrganizer.label,
    })),
  };
};
