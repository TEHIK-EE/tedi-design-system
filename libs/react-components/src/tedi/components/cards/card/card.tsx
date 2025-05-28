import cn from 'classnames';
import React, { CSSProperties, forwardRef } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './card.module.scss';
import { CardContent, CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import CardHeader from './card-header/card-header';
import CardNotification from './card-notification/card-notification';
import { CardBackground, CardBorderType, CardContentPaddingNumber, getCardBorderPlacementColor } from './utility';

export type CardContentPadding =
  | CardContentPaddingNumber
  | { vertical: CardContentPaddingNumber; horizontal: CardContentPaddingNumber }
  | {
      top: CardContentPaddingNumber;
      right: CardContentPaddingNumber;
      bottom: CardContentPaddingNumber;
      left: CardContentPaddingNumber;
    };
export interface SharedCardProps {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Card content padding
   * Values can be:<br />
   * - predefined number value in rems<br />
   * - object of separated horizontal and vertical number values in rems
   * - object of separated top, right, bottom, left number values in rems
   */
  padding?: CardContentPadding;
  /**
   * Background color.
   * @default primary
   */
  background?: CardBackground;
  /**
   * Background image.
   */
  backgroundImage?: CSSProperties['backgroundImage'];
  /**
   * Background position for the image.
   */
  backgroundPosition?: CSSProperties['backgroundPosition'];
  /**
   * Background size for the image.
   */
  backgroundSize?: CSSProperties['backgroundSize'];
  /**
   * Background repeat for the image.
   */
  backgroundRepeat?: CSSProperties['backgroundRepeat'];
  /**
   * Separator.
   */
  hasSeparator?: boolean;
}

type CardBreakpointProps = {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Follows the order in border-radius CSS property
   * Top-left / Top-right / Bottom-right / Bottom-left
   */
  borderRadius?: false | { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };
  /**
   * Remove border from card
   */
  borderless?: boolean;
  /**
   * Type of border
   */
  border?: CardBorderType;
} & Pick<CardContentProps, 'padding' | 'background'>;

export interface CardProps extends BreakpointSupport<CardBreakpointProps> {
  children?: React.ReactNode;
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { children, className, padding, background, borderRadius, borderless, border, ...rest } =
    getCurrentBreakpointProps<CardProps>(props, { padding: 1 });

  const [borderPlacement, borderColor] = getCardBorderPlacementColor(border);

  const cardBEM = cn(
    styles['tedi-card'],
    {
      [styles[`tedi-card--border-${borderPlacement}`]]: borderPlacement,
      [styles[`tedi-card--border--${borderColor}`]]: borderColor,
      [styles['tedi-card--borderless']]: borderless,
      [styles['tedi-card--no-border-radius-top']]: borderRadius === false || borderRadius?.top === false,
      [styles['tedi-card--no-border-radius-right']]: borderRadius === false || borderRadius?.right === false,
      [styles['tedi-card--no-border-radius-bottom']]: borderRadius === false || borderRadius?.bottom === false,
      [styles['tedi-card--no-border-radius-left']]: borderRadius === false || borderRadius?.left === false,
    },
    className
  );

  return (
    <CardContext.Provider value={{ padding, background }}>
      <div data-name="card" data-testid="tedi-card" {...rest} className={cardBEM} ref={ref}>
        {children}
      </div>
    </CardContext.Provider>
  );
});

CardComponent.displayName = 'Card';

export const Card = Object.assign(CardComponent, {
  Content: CardContent,
  Header: CardHeader,
  Notification: CardNotification,
});

export default Card;
