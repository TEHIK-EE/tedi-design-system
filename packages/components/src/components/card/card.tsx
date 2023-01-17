import cn from 'classnames';
import React, { forwardRef } from 'react';

import { validateChildren } from '../../helpers/validators/validateChildren';
import { ModalCloser } from '../modal';
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
  const BEM = cn(styles['card'], className, { [styles[`card--${type}`]]: type });

  return (
    <CardContext.Provider value={{ padding, background }}>
      <div data-name="card" {...rest} className={BEM} ref={ref}>
        {children}
      </div>
    </CardContext.Provider>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: (props) =>
    validateChildren('Card', props, {
      custom: [CardHeader.name, CardContent.name, ModalCloser.name],
      fragment: true,
    }),
};

export default Card;
