import cn from 'classnames';
import React from 'react';

import Button, { ButtonProps } from '../../../../button/button';
import { Tooltip, TooltipProps, TooltipProvider, TooltipTrigger } from '../../../../tooltip';
import styles from './header-dropdown.module.scss';

export interface HeaderDropdownProps {
  /**
   * Content of tooltip
   */
  children: React.ReactNode;
  /**
   * Trigger of Dropdown
   */
  triggerProps: ButtonProps;
  /**
   * Should trigger icon animate when open
   */
  shouldAnimate?: boolean;
  /**
   * Tooltip props
   */
  tooltipProps?: Omit<TooltipProps, 'children'>;
}

export const HeaderDropdown = (props: HeaderDropdownProps) => {
  const { children, triggerProps, shouldAnimate, tooltipProps } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TooltipProvider openWith="click" onToggle={setIsOpen} open={isOpen}>
      <TooltipTrigger>
        <Button
          {...triggerProps}
          className={cn(styles['header__dropdown'], triggerProps.className, {
            [styles['header__dropdown--open']]: shouldAnimate && isOpen,
          })}
        />
      </TooltipTrigger>
      <Tooltip
        {...tooltipProps}
        cardProps={{
          ...tooltipProps?.cardProps,
          border: 'top-primary-active-subtle',
          borderless: false,
          background: 'bg-muted',
        }}
      >
        {children}
      </Tooltip>
    </TooltipProvider>
  );
};

export default HeaderDropdown;
