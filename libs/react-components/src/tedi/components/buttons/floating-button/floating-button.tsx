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
   * Button axis
   * @default horizontal
   */
  axis?: FloatingButtonAxis;
  /**
   * Button visual type
   * @default primary
   */
  visualType?: FloatingButtonColor;
  /**
   * Button size
   * @default medium
   */
  size?: FloatingButtonSize;
  /**
   * Button position
   * @default fixed
   */
  position?: CSSProperties['position'];
  /**
   * Button placement
   */
  placement?: FloatingButtonPlacement;
  /**
   * Button offset
   */
  offset?: FloatingButtonOffset;
  /**
   * Button z-index
   */
  zIndex?: number;
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
    ...rest
  } = props;

  const placementStyles: CSSProperties = {
    position,
    zIndex,
    ...(placement?.vertical === 'top' && { top: offset?.top ?? 0 }),
    ...(placement?.vertical === 'bottom' && { bottom: offset?.bottom ?? 0 }),
    ...(placement?.vertical === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
    ...(placement?.horizontal === 'left' && { left: offset?.left ?? 0 }),
    ...(placement?.horizontal === 'right' && { right: offset?.right ?? 0 }),
    ...(placement?.horizontal === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
  };

  const BEM = cn(
    styles['tedi-floating-button'],
    styles[`tedi-floating-button--${axis}`],
    styles[`tedi-floating-button--${visualType}`],
    styles[`tedi-floating-button--${size}`],
    { [styles['tedi-floating-button--icon-only']]: rest.icon },
    className
  );

  return (
    <Button className={BEM} style={placementStyles} {...rest}>
      {children}
    </Button>
  );
};

export default FloatingButton;
