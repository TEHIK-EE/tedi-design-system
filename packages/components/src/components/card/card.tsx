import cn from 'classnames';
import React, { forwardRef } from 'react';

import { TColorsBorder } from '../commonTypes';
import styles from './card.module.scss';
import { CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import { CardHeaderProps } from './card-header/card-header';
import { getCardBorderPlacementColor } from './utility';

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
  /*
   * Follows the order in border-radius CSS property
   * Top-left / Top-right / Bottom-right / Bottom-left
   * */
  borderRadius?: false | { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };
  /**
   * Remove border from card
   */
  borderless?: boolean;
  /**
   * Type of border
   */
  border?: CardBorderType;
  /**
   * Change all CardContent & CardHeader padding default to this value
   * Values can be:<br />
   * - predefined number value in rems<br />
   * - object of separated horizontal and vertical number values in rems
   * - object of separated top, right, bottom, left number values in rems
   * @default 1
   */
  padding?: CardContentProps['padding'];
} & Pick<CardContentProps, 'background'>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { children, className, padding = 1, background, borderRadius, borderless, border, ...rest } = props;

  const [borderPlacement, borderColor] = getCardBorderPlacementColor(border);

  const BEM = cn(styles['card'], className, {
    [styles[`card--border-${borderPlacement}`]]: borderPlacement,
    [styles['card--borderless']]: !border && borderless,
    [styles['card--no-border-radius-top']]: borderRadius === false || borderRadius?.top === false,
    [styles['card--no-border-radius-right']]: borderRadius === false || borderRadius?.right === false,
    [styles['card--no-border-radius-bottom']]: borderRadius === false || borderRadius?.bottom === false,
    [styles['card--no-border-radius-left']]: borderRadius === false || borderRadius?.left === false,
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
