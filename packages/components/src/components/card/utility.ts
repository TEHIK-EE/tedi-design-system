import { TColorsBorder } from '../commonTypes';
import { CardBorderPlacement, CardProps } from './card';
import { CardContentPaddingNumber, CardContentProps } from './card-content/card-content';

export type CardBorderTypeArray = [CardBorderPlacement, TColorsBorder];

// Returns Array of [borderPlacement, borderColor];
export const getCardBorderPlacementColor = (border?: CardProps['border']): CardBorderTypeArray | [] => {
  const borderColor = border?.replace(/(top-)|(left-)/s, '') as TColorsBorder;
  const borderPlacement = border?.replace(new RegExp(`(${borderColor})|-`, 'g'), '') as CardBorderPlacement;

  return [borderPlacement, borderColor];
};

export const getPaddingCssVariables = (padding: CardContentProps['padding']) => {
  const isDirectionObject = (
    padding: CardContentProps['padding']
  ): padding is { vertical: CardContentPaddingNumber; horizontal: CardContentPaddingNumber } => {
    return typeof padding === 'object' && 'vertical' in padding && 'horizontal' in padding;
  };

  const topPadding =
    typeof padding === 'number' ? padding : isDirectionObject(padding) ? padding.vertical : padding?.top;
  const rightPadding =
    typeof padding === 'number' ? padding : isDirectionObject(padding) ? padding.horizontal : padding?.right;
  const bottomPadding =
    typeof padding === 'number' ? padding : isDirectionObject(padding) ? padding.vertical : padding?.bottom;
  const leftPadding =
    typeof padding === 'number' ? padding : isDirectionObject(padding) ? padding.horizontal : padding?.left;

  return {
    '--card-content-padding-top': `${topPadding}rem`,
    '--card-content-padding-right': `${rightPadding}rem`,
    '--card-content-padding-bottom': `${bottomPadding}rem`,
    '--card-content-padding-left': `${leftPadding}rem`,
  };
};
