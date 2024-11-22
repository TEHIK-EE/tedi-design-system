import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import styles from '../card.module.scss';
import CardContent, { CardContentPadding, CardContentProps } from '../card-content/card-content';
import { CardContext } from '../card-context';
import { CardBackground, getPaddingCssVariables } from '../utility';

export type CardHeaderBreakpointProps = {
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
   * Background image for the card header. Accepts a base64 string or URL.
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
} & Pick<CardContentProps, 'padding'>;

export type CardHeaderProps = BreakpointSupport<CardHeaderBreakpointProps> & {
  children?: React.ReactNode;
  role?: 'button';
};

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { role, ...restOfProps } = props;
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { padding: rootPadding } = React.useContext(CardContext);

  const {
    children,
    className,
    background = 'primary',
    backgroundImage,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
    hasSeparator,
    padding,
    ...rest
  } = getCurrentBreakpointProps<CardHeaderProps>(restOfProps, {
    padding: rootPadding,
  });

  const backgroundClass = background ? styles[`tedi-card--background--${background}`] : '';
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
    ...getPaddingCssVariables(padding),
  };

  return (
    <CardContent
      className={cn(styles['tedi-card__header'], backgroundClass, className)}
      padding={padding}
      role={role}
      style={backgroundStyle}
      hasSeparator={hasSeparator}
      {...rest}
    >
      {children}
    </CardContent>
  );
};

export default CardHeader;
