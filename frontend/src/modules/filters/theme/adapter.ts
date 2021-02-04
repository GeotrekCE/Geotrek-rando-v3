import { Choices, Filter } from '../interface';
import { RawTheme, Theme } from './interface';

const isRawThemeComplete = (rawTheme: Partial<RawTheme>): rawTheme is RawTheme =>
  rawTheme.id !== undefined && rawTheme.label !== undefined && rawTheme.pictogram !== undefined;

export const adaptTheme = (rawTheme: RawTheme): Theme => ({
  value: `${rawTheme.id}`,
  label: rawTheme.label,
});

export const adaptThemeFilter = (rawThemes: Partial<RawTheme>[]): Filter => ({
  id: 'theme',
  options: rawThemes.filter(isRawThemeComplete).map(adaptTheme),
});

export const adaptThemes = (rawThemes: Partial<RawTheme>[]): Choices =>
  rawThemes.filter(isRawThemeComplete).reduce(
    (themes, currentRawTheme) => ({
      ...themes,
      [`${currentRawTheme.id}`]: { label: currentRawTheme.label },
    }),
    {},
  );
