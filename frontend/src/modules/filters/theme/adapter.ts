import { THEME_ID } from '../constant';
import { Choices, FilterWithoutType } from '../interface';
import { RawTheme, Theme } from './interface';

const isRawThemeComplete = (rawTheme: Partial<RawTheme>): rawTheme is RawTheme =>
  rawTheme.id !== undefined && rawTheme.label !== undefined && rawTheme.pictogram !== undefined;

export const adaptTheme = (rawTheme: RawTheme): Theme => ({
  value: `${rawTheme.id}`,
  label: rawTheme.label,
});

export const adaptThemeFilter = (rawThemes: Partial<RawTheme>[]): FilterWithoutType => ({
  id: THEME_ID,
  options: rawThemes.filter(isRawThemeComplete).map(rawTheme => ({
    value: `${rawTheme.id}`,
    label: rawTheme.label,
    pictogramUrl: rawTheme.pictogram,
  })),
});

export const adaptThemes = (rawThemes: Partial<RawTheme>[]): Choices =>
  Object.fromEntries(rawThemes.map(theme => [theme.id, { label: theme.label }]))
