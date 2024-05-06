import cn from 'classnames';
import React from 'react';

import { TColorsBackground } from '../../../../../shared/commonTypes';
import { BreakpointSupport, getBackgroundColorClass, useBreakpointProps } from '../../../../../shared/helpers';
import styles from '../card.module.scss';
import { CardContext } from '../card-context';
import { getPaddingCssVariables } from '../utility';

export type CardContentPaddingNumber = 0 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3;
export type CardContentPadding =
  | CardContentPaddingNumber
  | { vertical: CardContentPaddingNumber; horizontal: CardContentPaddingNumber }
  | {
      top: CardContentPaddingNumber;
      right: CardContentPaddingNumber;
      bottom: CardContentPaddingNumber;
      left: CardContentPaddingNumber;
    };

interface CardContentBreakpointProps {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Card content padding
   * Values can be:<br />
   * - predefined number value in rems<br />
   * - object of separated horizontal and vertical number values in rems
   * - object of separated top, right, bottom, left number values in rems
   * @default Padding of Card
   */
  padding?: CardContentPadding;
  /**
   * Background color of card content
   * @default Background of Card
   */
  background?: TColorsBackground;
}

export interface CardContentProps extends BreakpointSupport<CardContentBreakpointProps> {
  /**
   * Card Content
   */
  children?: React.ReactNode;
}

export const CardContent = (props: CardContentProps): JSX.Element => {
  const { padding: rootPadding, background: rootBackground } = React.useContext(CardContext);
  const { getCurrentBreakpointProps } = useBreakpointProps();

  const { children, className, padding, background, ...rest } = getCurrentBreakpointProps<CardContentProps>(props, {
    padding: rootPadding,
    background: rootBackground,
  });

  const CardContentBEM = cn(styles['card__content'], { [getBackgroundColorClass(background)]: background }, className);

  return (
    <div
      data-name="card-content"
      data-padding={typeof padding === 'number' ? `${padding}rem` : undefined}
      style={getPaddingCssVariables(padding)}
      {...rest}
      className={CardContentBEM}
    >
      {children}
    </div>
  );
};

export default CardContent;
