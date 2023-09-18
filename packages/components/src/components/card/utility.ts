import { TColorsBorder } from '../commonTypes';
import { CardBorderPlacement, CardProps } from './card';

export type CardBorderTypeArray = [CardBorderPlacement, TColorsBorder];

// Returns Array of [borderPlacement, borderColor];
export const getCardBorderPlacementColor = (border?: CardProps['border']): CardBorderTypeArray | [] => {
  return (border?.split(/-(.*)/s) ?? []) as CardBorderTypeArray;
};
