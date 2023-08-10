import cn from 'classnames';
import React, { forwardRef } from 'react';

import { TColorsBorder } from '../commonTypes';
import styles from './card.module.scss';
import { CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import { CardHeaderProps } from './card-header/card-header';
import { mapDeprecatedType } from './utility';

export type CardTypeDeprecated =
  | 'success'
  | 'warning'
  | 'error'
  | 'borderless'
  | 'success-top'
  | 'warning-top'
  | 'error-top';
export type CardPaddingDeprecated = 'none' | 'xsmall' | 'small' | 'medium' | 'large';
export type CardPadding = 0 | 0.5 | 0.75 | 1 | 1.5;
export type CardBorderPlacement = 'top' | 'left';
export type CardBorderType = 'default' | `${CardBorderPlacement}-${TColorsBorder}`;

export type CardProps = {
  /**
   * CardHeader and/or CardContent.
   */
  children?:
    | React.ReactElement<CardContentProps | CardHeaderProps>
    | React.ReactElement<CardContentProps | CardHeaderProps>[]
    | React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Type of card.
   * @deprecated - use border/borderless instead
   */
  type?: CardTypeDeprecated;
  /*
   * Follows the order in border-radius CSS property
   * Top-left / Top-right / Bottom-right / Bottom-left
   * */
  borderRadius?: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };
  /**
   * Remove border from card
   */
  borderless?: boolean;
  /**
   * Type of border
   */
  border?: CardBorderType;
  /**
   * Card padding.
   * String values of padding are deprecated, use numbers instead
   * @default 1
   */
  padding?: CardPadding | CardPaddingDeprecated;
} & Pick<CardContentProps, 'background'>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { children, className, padding = 1, background, type, borderRadius, borderless, border, ...rest } = props;

  // @deprecated - remove mapDeprecatedType usage in next major release
  const [borderPlacement, borderColor] = border ? border.split(/-(.*)/s) : mapDeprecatedType(type);

  const BEM = cn(styles['card'], className, {
    [styles[`card--${type}`]]: type,
    [styles[`card--border-${borderPlacement}`]]: borderPlacement,
    [styles['card--borderless']]: borderless || type === 'borderless',
    [styles['card--no-border-radius-top']]: borderRadius?.top === false,
    [styles['card--no-border-radius-right']]: borderRadius?.right === false,
    [styles['card--no-border-radius-bottom']]: borderRadius?.bottom === false,
    [styles['card--no-border-radius-left']]: borderRadius?.left === false,
  });

  return (
    <CardContext.Provider value={{ padding, background }}>
      <div
        data-name="card"
        {...rest}
        className={BEM}
        ref={ref}
        style={borderColor ? { '--card-border-color': `var(--color-${borderColor})` } : undefined}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
});

Card.displayName = 'Card';

export default Card;
