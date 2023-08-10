import { TColorsBorder } from '../commonTypes';
import { CardBorderPlacement, CardPadding, CardProps, CardTypeDeprecated } from './card';

// @deprecated - remove with old padding types
export const mapDeprecatedPadding = (padding: CardProps['padding']): CardPadding => {
  if (typeof padding === 'number') {
    return padding;
  }

  switch (padding) {
    case 'none':
      return 0;
    case 'xsmall':
      return 0.5;
    case 'small':
      return 0.75;
    case 'medium':
      return 1;
    case 'large':
      return 1.5;
    default:
      return 1;
  }
};

export const mapDeprecatedType = (type?: CardTypeDeprecated): [CardBorderPlacement, TColorsBorder] | [] => {
  switch (type) {
    case 'success':
      return ['left', 'positive-main'];
    case 'success-top':
      return ['top', 'positive-main'];
    case 'warning':
      return ['left', 'warning-main'];
    case 'warning-top':
      return ['top', 'warning-main'];
    case 'error':
      return ['left', 'important-main'];
    case 'error-top':
      return ['top', 'important-main'];
    default:
      return [];
  }
};
