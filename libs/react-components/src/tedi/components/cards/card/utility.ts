import { CardProps } from './card';
import { CardContentProps } from './card-content/card-content';

export type CardBorderPlacement = 'top' | 'left' | undefined;
export type CardBorderType = 'border-default' | `${CardBorderPlacement}-${CardBackground}` | CardBackground;
export type CardContentPaddingNumber = 0 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3;
export type CardBackground =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'brand-primary'
  | 'brand-secondary'
  | 'brand-tertiary'
  | 'brand-quaternary'
  | 'danger-primary'
  | 'danger-secondary'
  | 'success-primary'
  | 'success-secondary'
  | 'info-primary'
  | 'info-secondary'
  | 'warning-primary'
  | 'warning-secondary'
  | 'neutral-primary'
  | 'neutral-secondary';

export type CardBorderTypeArray = [CardBorderPlacement, CardBackground];

/**
 * Extracts the border placement and color from the provided border value.
 * @param border - The border value from CardProps.
 * @returns A tuple [placement, color] or an empty array if border is undefined.
 */
export const getCardBorderPlacementColor = (border?: CardProps['border']): CardBorderTypeArray | [] => {
  if (!border) return [];

  if (!border.includes('-')) {
    return [undefined, border as CardBackground];
  }

  const borderColor = border.replace(/(top-)|(left-)/, '') as CardBackground;
  const borderPlacement = border.replace(new RegExp(`(${borderColor})|-`, 'g'), '') as CardBorderPlacement;

  return [borderPlacement, borderColor];
};

/**
 * Generates CSS variables for card content padding based on the provided padding configuration.
 * @param padding - The padding configuration from CardContentProps.
 * @returns An object with CSS variables for padding.
 */
export const getPaddingCssVariables = (padding: CardContentProps['padding']) => {
  const isDirectionObject = (
    value: CardContentProps['padding']
  ): value is { vertical: CardContentPaddingNumber; horizontal: CardContentPaddingNumber } =>
    typeof value === 'object' && 'vertical' in value && 'horizontal' in value;

  if (typeof padding === 'number') {
    return {
      '--card-content-padding-top': `${padding}rem`,
      '--card-content-padding-right': `${padding}rem`,
      '--card-content-padding-bottom': `${padding}rem`,
      '--card-content-padding-left': `${padding}rem`,
    };
  }

  if (isDirectionObject(padding)) {
    const { vertical, horizontal } = padding;
    return {
      '--card-content-padding-top': `${vertical}rem`,
      '--card-content-padding-right': `${horizontal}rem`,
      '--card-content-padding-bottom': `${vertical}rem`,
      '--card-content-padding-left': `${horizontal}rem`,
    };
  }

  const { top = 0, right = 0, bottom = 0, left = 0 } = padding || {};
  return {
    '--card-content-padding-top': `${top}rem`,
    '--card-content-padding-right': `${right}rem`,
    '--card-content-padding-bottom': `${bottom}rem`,
    '--card-content-padding-left': `${left}rem`,
  };
};
