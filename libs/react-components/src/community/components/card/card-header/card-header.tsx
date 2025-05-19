import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { TColorsBackground } from '../../commonTypes';
import styles from '../card.module.scss';
import { CardContentProps } from '../card-content/card-content';
import { CardContext } from '../card-context';
import { getPaddingCssVariables } from '../utility';

/**
 * @deprecated use CardHeaderBackground
 */
export type CardHeaderVariant =
  | 'default'
  | Extract<TColorsBackground, 'primary-main' | 'primary-active' | 'white' | 'bg-muted'>; // bg-muted, primary-main and primary-active are mainly used inside AccordionItemHeader
export type CardHeaderBackground = CardHeaderVariant;

type CardHeaderBreakpointProps = {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Variant of CardHeader.
   * @deprecated use background
   */
  variant?: CardHeaderVariant;
  /**
   * Background color of card header.
   * Primary-main and primary-active are mainly used inside AccordionItemHeader.
   * @default default
   */
  background?: CardHeaderBackground;
} & Pick<CardContentProps, 'padding'>;

export type CardHeaderProps = BreakpointSupport<CardHeaderBreakpointProps> & {
  /**
   * Card header content
   */
  children?: React.ReactNode;
} & ({ role?: never } | CardHeaderAsButton);

/**
 * Allows the CardHeader to be used as a button. For example in the AccordionItemHeader.
 */
export interface CardHeaderAsButton extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  role: 'button';
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { variant, ...restOfProps } = props;
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { padding: rootPadding } = React.useContext(CardContext);
  const { children, className, background, padding, ...rest } = getCurrentBreakpointProps<CardHeaderProps>(
    restOfProps,
    {
      background: variant ?? 'default', // map deprecated variant prop to background. TODO remove when variant prop is removed
      padding: rootPadding,
    }
  );
  const BEM = cn(styles['card__header'], styles[`card__header--${background}`], className);

  return (
    <div data-name="card-header" style={getPaddingCssVariables(padding)} {...rest} className={BEM}>
      {children}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

export default CardHeader;
