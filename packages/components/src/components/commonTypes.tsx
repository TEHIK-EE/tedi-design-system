export type TColorsBackground =
  // Primary
  | 'primary-main'
  | 'primary-active'
  | 'primary-active-subtle'
  | 'primary-highlight'
  | 'primary-highlight-subtle'
  // Accent
  | 'accent-main'
  | 'accent-highlight'
  // Foreground
  | 'bg-default'
  | 'bg-muted'
  | 'bg-subtle'
  | 'bg-disabled'
  | 'bg-inverted'
  | 'bg-inverted-contrast'
  // Shades
  | 'black'
  | 'white'
  // Functional colors - Positive
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

export const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;
