import cn from 'classnames';
import React from 'react';

import { getBackgroundColorClass } from '../../colors/colors';
import { TColorsBackground } from '../../commonTypes';
import styles from '../card.module.scss';
import { CardContext } from '../card-context';

export interface CardContentProps {
  /**
   * Card Content
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Card content padding
   * @default Padding of Card
   */
  padding?: 'none' | 'xsmall' | 'small' | 'medium' | 'large';
  /**
   * Background color of card content
   * @default Background of Card
   */
  background?: TColorsBackground;
}

export const CardContent = (props: CardContentProps): JSX.Element => {
  const { padding: rootPadding, background: rootBackground } = React.useContext(CardContext);
  const { children, className, padding = rootPadding, background = rootBackground, ...rest } = props;
  const CardContentBEM = cn(styles['card__content'], className, styles[`card__content--padding-${padding}`], {
    [getBackgroundColorClass(background)]: background,
  });

  return (
    <div data-name="card-content" {...rest} data-padding={padding} className={CardContentBEM}>
      {children}
    </div>
  );
};

export default CardContent;
