import { Choices, Filter } from '../interface';
import { RawTheme } from './interface';

export const adaptThemeFilter = (rawThemes: RawTheme[]): Filter => ({
  id: 'theme',
  options: rawThemes.map(rawTheme => ({
    value: `${rawTheme.id}`,
    label: rawTheme.label,
  })),
});

export const adaptThemes = (rawThemes: RawTheme[]): Choices =>
  rawThemes.reduce(
    (themes, currentRawTheme) => ({
      ...themes,
      [`${currentRawTheme.id}`]: { label: currentRawTheme.label },
    }),
    {},
  );
