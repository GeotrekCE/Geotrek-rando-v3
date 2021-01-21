import { Choices, Filter } from '../interface';
import { RawTheme, Theme } from './interface';

export const adaptTheme = (rawTheme: RawTheme): Theme => ({
  value: `${rawTheme.id}`,
  label: rawTheme.label,
});

export const adaptThemeFilter = (rawThemes: RawTheme[]): Filter => ({
  id: 'theme',
  options: rawThemes.map(adaptTheme),
});

export const adaptThemes = (rawThemes: RawTheme[]): Choices =>
  rawThemes.reduce(
    (themes, currentRawTheme) => ({
      ...themes,
      [`${currentRawTheme.id}`]: { label: currentRawTheme.label },
    }),
    {},
  );
