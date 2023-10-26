import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers/hooks/use-breakpoint-props';
import styles from '../card.module.scss';
import { CardContentProps } from '../card-content/card-content';
import { CardContext } from '../card-context';
import { getPaddingCssVariables } from '../utility';

export type CardHeaderVariant = 'default' | 'white';

type CardHeaderBreakpointProps = {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Variant of CardHeader
   * @default default
   */
  variant?: CardHeaderVariant;
} & Pick<CardContentProps, 'padding' | 'background'>;

export interface CardHeaderProps extends BreakpointSupport<CardHeaderBreakpointProps> {
  /**
   * Id passed to the header
   */
  id?: string;
  /**
   * Card header content
   */
  children?: React.ReactNode;
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { padding: rootPadding } = React.useContext(CardContext);
  const { children, className, variant, padding, ...rest } = getCurrentBreakpointProps<CardHeaderProps>(props, {
    variant: 'default',
    padding: rootPadding,
  });
  const BEM = cn(styles['card__header'], styles[`card__header--${variant}`], className);

  return (
    <div data-name="card-header" style={getPaddingCssVariables(padding)} {...rest} className={BEM}>
      {children}
    </div>
  );
};

export default CardHeader;
