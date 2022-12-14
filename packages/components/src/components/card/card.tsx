import cn from 'classnames';
import React, { forwardRef } from 'react';

import { validateChildren } from '../../helpers';
import styles from './card.module.scss';
import CardContent, { CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import CardHeader, { CardHeaderProps } from './card-header/card-header';

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
} & Pick<CardContentProps, 'padding' | 'background'>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { children, className, padding, background, type, ...rest } = props;
  return (
    <CardContext.Provider value={{ padding, background }}>
      <div className={cn(styles['card'], className, { [styles[`card--${type}`]]: type })} ref={ref} {...rest}>
        {children}
      </div>
    </CardContext.Provider>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: (props) => validateChildren(props, { custom: [CardHeader.name, CardContent.name], fragment: true }),
};

export default Card;
