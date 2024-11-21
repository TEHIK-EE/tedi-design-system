import cn from 'classnames';
import React, { forwardRef } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './card.module.scss';
import { CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import { CardBorderType, getCardBorderPlacementColor } from './utility';

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

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { children, className, padding, background, borderRadius, borderless, border, ...rest } =
    getCurrentBreakpointProps<CardProps>(props, { padding: 1 });

  const [borderPlacement, borderColor] = getCardBorderPlacementColor(border);

  const BEM = cn(
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
      <div data-name="card" {...rest} className={BEM} ref={ref}>
        {children}
      </div>
    </CardContext.Provider>
  );
});

Card.displayName = 'Card';

export default Card;
