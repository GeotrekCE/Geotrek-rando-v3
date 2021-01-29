/**
 * Adds h behind hours below 24.
 * Converts into days above 24.
 * Rounds hours to day above if applicable.
 *
 * Ex:
 * - 13 -> 13h
 * - 2.5 -> 2h30
 * - 24 -> 1j
 * - 30h -> 2j
 * @param hours number of hours
 */
export const formatHours = (hours: number): string => {
  if (hours >= 24) return `${Math.ceil(hours / 24)}j`;
  if (hours % 1 === 0) return `${hours}h`;
  return `${Math.floor(hours)}h${Math.round((hours % 1) * 60)}`;
};
