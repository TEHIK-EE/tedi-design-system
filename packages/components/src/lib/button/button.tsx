import cn from 'classnames';
import { forwardRef } from 'react';

import ButtonContent, { ButtonContentButtonProps } from '../button-content/button-content';
import styles from './button.module.scss';

export type ButtonTypes = 'primary' | 'secondary' | 'link';

export interface ButtonProps extends Omit<ButtonContentButtonProps, 'element'> {
  /**
   * If button should take all the space it has
   */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref): JSX.Element => {
  const { fullWidth, className, ...rest } = props;

  const ButtonBEM = cn(className, { [styles['btn--full-width']]: fullWidth });

  return <ButtonContent {...rest} element="button" className={ButtonBEM} />;
});

Button.displayName = 'Button';

export default Button;
