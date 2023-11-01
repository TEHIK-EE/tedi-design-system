export type ColorsPrimary =
  | 'primary-main'
  | 'primary-active'
  | 'primary-active-subtle'
  | 'primary-highlight'
  | 'primary-highlight-subtle';
export type ColorsAccent = 'accent-main' | 'accent-highlight';
export type ColorsForeground = 'text-default' | 'text-muted' | 'text-subtle' | 'text-disabled' | 'text-inverted';
export type ColorsBackground =
  | 'bg-default'
  | 'bg-muted'
  | 'bg-subtle'
  | 'bg-disabled'
  | 'bg-inverted'
  | 'bg-inverted-contrast';
export type ColorsShades = 'black' | 'white';
export type ColorsBorder = 'border-default' | 'border-contrast';
export type ColorsFunctional =
  | 'positive-main'
  | 'positive-active'
  | 'positive-highlight'
  | 'important-main'
  | 'important-active'
  | 'important-highlight'
  | 'info-main'
  | 'info-active'
  | 'info-highlight'
  | 'warning-main'
  | 'warning-highlight';

// Types with prefix T are meant to be all colors that can be used as background or border.
export type TColorsBackground =
  | ColorsPrimary
  | ColorsAccent
  | ColorsBackground
  | ColorsShades
  | ColorsFunctional
  | 'transparent';
export type TColorsBorder = ColorsPrimary | ColorsAccent | ColorsBorder | ColorsFunctional;

export const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;
