import cn from 'classnames';
import React from 'react';

import styles from '../card.module.scss';
import { CardContentProps } from '../card-content/card-content';
import { CardContext } from '../card-context';
import { getPaddingCssVariables } from '../utility';

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
   * Values can be:<br />
   * - predefined number value in rems<br />
   * - object of separated horizontal and vertical number values in rems
   * - object of separated top, right, bottom, left number values in rems
   * @default Padding of Card
   */
  padding?: CardContentProps['padding'];
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { padding: rootPadding } = React.useContext(CardContext);
  const { children, className, variant = 'default', padding = rootPadding, ...rest } = props;
  const BEM = cn(styles['card__header'], styles[`card__header--${variant}`], className);

  return (
    <div data-name="card-header" style={getPaddingCssVariables(padding)} {...rest} className={BEM}>
      {children}
    </div>
  );
};

export default CardHeader;
