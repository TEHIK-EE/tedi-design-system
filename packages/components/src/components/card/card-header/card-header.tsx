import cn from 'classnames';
import React from 'react';

import styles from '../card.module.scss';
import { CardContentProps } from '../card-content/card-content';
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
   * Variant of CardHeader
   * @default default
   */
  variant?: CardHeaderVariant;
  /**
   * Card Header padding
   * String values of padding are deprecated, use numbers instead
   * @default Padding of Card
   */
  padding?: CardContentProps['padding'];
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { padding: rootPadding } = React.useContext(CardContext);
  const { children, className, variant = 'default', padding = rootPadding, ...rest } = props;
  const BEM = cn(styles['card__header'], styles[`card__header--${variant}`], className);

  return (
    <div
      data-name="card-header"
      style={{
        '--card-header-padding': `${padding}rem`,
      }}
      {...rest}
      className={BEM}
    >
      {children}
    </div>
  );
};

export default CardHeader;
