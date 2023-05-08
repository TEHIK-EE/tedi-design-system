import cn from 'classnames';
import React, { forwardRef } from 'react';

import { validateChildren } from '../../helpers/validators/validateChildren';
import { ModalCloser } from '../modal';
import styles from './card.module.scss';
import CardContent, { CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import CardHeader, { CardHeaderProps } from './card-header/card-header';

export type CardPadding = 'none' | 'xsmall' | 'small' | 'medium' | 'large';

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
   */
  type?: 'success' | 'warning' | 'error' | 'borderless' | 'success-top' | 'warning-top' | 'error-top';
  /*
   * Turn off border-radius for specific corners
   * Follows the order in border-radius CSS property
   * Top-left / Top-right / Bottom-right / Bottom-left
   * */
  borderRadius?: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };
  /**
   * Card padding
   * @default medium
   */
  padding?: CardPadding;
} & Pick<CardContentProps, 'background'>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { children, className, padding = 'medium', background, type, borderRadius, ...rest } = props;
  const BEM = cn(styles['card'], className, {
    [styles[`card--${type}`]]: type,
    [styles['card--no-border-radius-top']]: borderRadius?.top === false,
    [styles['card--no-border-radius-right']]: borderRadius?.right === false,
    [styles['card--no-border-radius-bottom']]: borderRadius?.bottom === false,
    [styles['card--no-border-radius-left']]: borderRadius?.left === false,
  });

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
