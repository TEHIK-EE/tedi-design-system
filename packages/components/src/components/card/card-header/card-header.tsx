import cn from 'classnames';
import React from 'react';

import { CardPadding } from '../card';
import styles from '../card.module.scss';
import { CardContext } from '../card-context';

export type CardHeaderVariant = 'default' | 'white';

export interface CardHeaderProps {
  /**
   * Card header content
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Style of CardHeader. !!Deprecated - use variant prop instead
   * @default default
   * @deprecated - Use variant prop instead - TEHVEER-66
   */
  style?: CardHeaderVariant;
  /**
   * Variant of CardHeader
   * @default default
   */
  variant?: CardHeaderVariant;
  /**
   * Card Header padding
   * @default Padding of Card
   */
  padding?: CardPadding;
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { padding: rootPadding } = React.useContext(CardContext);
  const { children, className, style, variant = 'default', padding = rootPadding, ...rest } = props;
  const BEM = cn(
    styles['card__header'],
    styles[`card__header--${style || variant}`],
    styles[`card__header--padding-${padding}`],
    className
  );

  return (
    <div data-name="card-header" {...rest} className={BEM}>
      {children}
    </div>
  );
};

export default CardHeader;
