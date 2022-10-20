import cn from 'classnames';
import React, { forwardRef } from 'react';

import { validateChildren } from '../helper';
import styles from './card.module.scss';
import CardContent, { CardContentProps } from './card-content/card-content';
import CardHeader, { CardHeaderProps } from './card-header/card-header';

export interface CardProps {
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
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { children, className, type } = props;
  return (
    <div className={cn(styles['card'], className, { [styles[`card--${type}`]]: type })} ref={ref}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: (props) => validateChildren(props, { custom: [CardHeader.name, CardContent.name], fragment: true }),
};

export default Card;
