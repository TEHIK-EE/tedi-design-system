import cn from 'classnames';
import React from 'react';

import { getBackgroundColorClass } from '../../../helpers/background-colors/background-colors';
import { TColorsBackground } from '../../commonTypes';
import { CardProps } from '../card';
import styles from '../card.module.scss';
import { CardContext } from '../card-context';
import { mapDeprecatedPadding } from '../utility';

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
   * String values of padding are deprecated, use numbers instead
   * @default Padding of Card
   */
  padding?: CardProps['padding'];
  /**
   * Background color of card content
   * @default Background of Card
   */
  background?: TColorsBackground;
}

export const CardContent = (props: CardContentProps): JSX.Element => {
  const { padding: rootPadding, background: rootBackground } = React.useContext(CardContext);
  const { children, className, padding = rootPadding, background = rootBackground, ...rest } = props;
  const CardContentBEM = cn(styles['card__content'], { [getBackgroundColorClass(background)]: background }, className);

  // @deprecated - remove mapDeprecatedPadding usage in next major release
  const mappedPaddingValue = `${mapDeprecatedPadding(padding)}rem`;

  return (
    <div
      data-name="card-content"
      data-padding={mappedPaddingValue}
      style={{
        // @deprecated - remove mapDeprecatedPadding usage in next major release
        '--card-content-padding': mappedPaddingValue,
      }}
      {...rest}
      className={CardContentBEM}
    >
      {children}
    </div>
  );
};

export default CardContent;
