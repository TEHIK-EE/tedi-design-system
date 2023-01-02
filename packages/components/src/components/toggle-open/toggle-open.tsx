import cn from 'classnames';
import React from 'react';

import Button, { ButtonProps } from '../button/button';
import styles from './toggle-open.module.scss';

export interface ToggleOpenProps extends Omit<ButtonProps, 'children' | 'iconRight'> {
  /**
   * Name on the button to open the item
   */
  openText: string;
  /**
   * Name on the button to close the item
   */
  closeText: string;
  /**
   * If the element currently open
   */
  isOpen: boolean;
}

export const ToggleOpen = ({ openText, closeText, isOpen, classNameIcon, ...rest }: ToggleOpenProps): JSX.Element => {
  const ToggleOpenBEM = cn({ [styles['toggle--open']]: isOpen }, { [styles['toggle--close']]: !isOpen }, classNameIcon);

  return (
    <Button data-name="button" iconRight="expand_more" classNameIcon={ToggleOpenBEM} {...rest}>
      {isOpen ? closeText : openText}
    </Button>
  );
};

export default ToggleOpen;
