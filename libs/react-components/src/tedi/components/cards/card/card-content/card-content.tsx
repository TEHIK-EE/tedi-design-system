import cn from 'classnames';
import React, { CSSProperties } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import styles from '../card.module.scss';
import { CardContext } from '../card-context';
import { CardBackground, getPaddingCssVariables } from '../utility';

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

export type CardContentBreakpointProps = {
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
   * Background color of card header.
   * Primary-main and primary-active are mainly used inside AccordionItemHeader.
   * @default primary
   */
  background?: CardBackground;
  /**
   * Background image for the card content. Accepts base64 string or URL.
   */
  backgroundImage?: string;
  /**
   * Background position for the image.
   */
  backgroundPosition?: React.CSSProperties['backgroundPosition'];
  /**
   * Background size for the image.
   */
  backgroundSize?: React.CSSProperties['backgroundSize'];
  /**
   * Background repeat for the image.
   */
  backgroundRepeat?: React.CSSProperties['backgroundRepeat'];
  hasSeparator?: boolean;
  stretch?: boolean;
  style?: CSSProperties;
};

export interface CardContentProps extends BreakpointSupport<CardContentBreakpointProps> {
  children?: React.ReactNode;
  role?: 'button';
}

export const CardContent = (props: CardContentProps): JSX.Element => {
  const { padding: rootPadding, background: rootBackground } = React.useContext(CardContext);
  const { getCurrentBreakpointProps } = useBreakpointProps();

  const {
    children,
    className,
    padding,
    background,
    backgroundImage,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
    hasSeparator,
    stretch,
    role,
    ...rest
  } = getCurrentBreakpointProps<CardContentProps>(props, {
    padding: rootPadding,
    background: rootBackground,
  });

  const backgroundClass = background ? styles[`tedi-card--background--${background}`] : '';
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
  };
  const Component = role === 'button' ? 'button' : 'div';

  return (
    <Component
      data-name="card-content"
      data-padding={typeof padding === 'number' ? `${padding}rem` : undefined}
      className={cn(styles['tedi-card__content'], backgroundClass, className, {
        [styles['tedi-card__content--separator']]: hasSeparator,
        [styles['tedi-card__content--stretch']]: stretch,
      })}
      style={{ ...getPaddingCssVariables(padding), ...backgroundStyle }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CardContent;
