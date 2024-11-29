import cn from 'classnames';
import React from 'react';

import { Button, ButtonProps } from '../button/button';
import styles from './info-button.module.scss';

export const InfoButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): JSX.Element => (
    <Button
      className={cn(styles['tedi-info-button'])}
      data-name="info-button"
      {...props}
      type="button"
      icon={{ name: 'info', size: 16 }}
      visualType="neutral"
      ref={ref}
    >
      {props.children}
    </Button>
  )
);

InfoButton.displayName = 'InfoButton';

export default InfoButton;
