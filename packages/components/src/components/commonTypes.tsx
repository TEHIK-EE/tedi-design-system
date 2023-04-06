type TColorsBackgroundOld =
  // @deprecated old ones
  | 'white'
  | 'background-light'
  | 'background'
  | 'warning-light'
  | 'success-light'
  | 'error-light'
  | 'primary-1'
  | 'primary-2'
  | 'primary';

export type TColorsBackground =
  | TColorsBackgroundOld
  | 'bg-default'
  | 'bg-muted'
  | 'bg-subtle'
  | 'warning-highlight'
  | 'important-highlight'
  | 'positive-highlight'
  | 'primary-main'
  | 'primary-highlight-subtle'
  | 'primary-highlight';

export const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;
