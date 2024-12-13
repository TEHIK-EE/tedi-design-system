import cn from 'classnames';
import React from 'react';

import { Button, ButtonProps } from '../button/button';
import styles from './info-button.module.scss';

export interface InfoButtonProps extends Omit<ButtonProps, 'size'> {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall?: boolean;
}

export const InfoButton = React.forwardRef<HTMLButtonElement, InfoButtonProps>(
  ({ isSmall, ...props }, ref): JSX.Element => (
    <Button
      className={cn(styles['tedi-info-button'])}
      data-name="info-button"
      {...props}
      type="button"
      icon={{ name: 'info', size: isSmall ? 16 : 18 }}
      visualType="neutral"
      ref={ref}
    >
      {props.children}
    </Button>
  )
);

InfoButton.displayName = 'InfoButton';

export default InfoButton;
