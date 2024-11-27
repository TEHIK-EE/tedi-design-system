import React from 'react';

import { Button, ButtonProps } from '../button/button';

export interface InfoButtonProps extends Pick<ButtonProps, 'children' | 'onClick' | 'title' | 'id'> {
  /**
   * Additional classes to apply custom styles to the InfoButton.
   */
  className?: string;
}

export const InfoButton = React.forwardRef<HTMLButtonElement, InfoButtonProps>((props, ref): JSX.Element => {
  const { className, ...rest } = props;

  return (
    <Button
      data-name="info-button"
      type="button"
      className={className}
      icon={{ name: 'info' }}
      visualType="neutral"
      size="small"
      ref={ref}
      {...rest}
    >
      {rest.children}
    </Button>
  );
});

InfoButton.displayName = 'InfoButton';

export default InfoButton;
