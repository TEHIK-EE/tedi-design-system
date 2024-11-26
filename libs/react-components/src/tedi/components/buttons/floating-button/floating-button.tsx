import cn from 'classnames';
import { CSSProperties } from 'react';

import Button, { ButtonProps } from '../button/button';
import styles from './floating-button.module.scss';

type FloatingButtonAxis = 'horizontal' | 'vertical';
type FloatingButtonColor = 'primary' | 'secondary';
type FloatingButtonSize = 'medium' | 'large';
type FloatingButtonPlacement = {
  vertical: 'top' | 'bottom' | 'center';
  horizontal: 'left' | 'right' | 'center';
};
type FloatingButtonOffset = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

export interface FloatingButtonProps
  extends Omit<
    ButtonProps,
    'visualType' | 'fullWidth' | 'color' | 'size' | 'isLoading' | 'noStyle' | 'renderWrapperElement'
  > {
  /**
   * Button visual type
   * @default horizontal
   */
  axis?: FloatingButtonAxis;
  /**
   * Button visual type
   * @default primary
   */
  visualType?: FloatingButtonColor;
  /**
   * Size of the FloatingButton
   * @default medium
   */
  size?: FloatingButtonSize;
  /**
   * Position of the FloatingButton
   * @default fixed
   */
  position?: CSSProperties['position'];
  placement?: FloatingButtonPlacement;
  offset?: FloatingButtonOffset;
  zIndex?: number;
  /**
   * Hide button while scrolling
   * @default false
   */
  hideOnScroll?: boolean;
}

export const FloatingButton = (props: FloatingButtonProps): JSX.Element => {
  const {
    children,
    className,
    axis = 'horizontal',
    visualType = 'primary',
    size = 'medium',
    position = 'fixed',
    placement,
    offset,
    zIndex,
    hideOnScroll,
    ...rest
  } = props;

  const BEM = cn(
    styles['tedi-floating-button'],
    styles[`tedi-floating-button--${axis}`],
    styles[`tedi-floating-button--${visualType}`],
    styles[`tedi-floating-button--${size}`],
    { [styles['tedi-floating-button__icon-only']]: rest.icon },
    className
  );

  return (
    <Button className={BEM} style={{ position }} {...rest}>
      {children}
    </Button>
  );
};

export default FloatingButton;
