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
  /**
   * Should Tooltip be initially shown. Won't work with open and onToggle.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Should the Tooltip be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open?: boolean;
  /**
   * Callback when Tooltip is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle?: (open: boolean) => void;
}

export const HeaderDropdown = (props: HeaderDropdownProps) => {
  const { children, triggerProps, defaultOpen, open, onToggle, shouldAnimate, tooltipProps } = props;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isOpen = open !== undefined ? open : internalOpen;

  const handleToggle = (open: boolean) => {
    setInternalOpen(open);
    onToggle?.(open);
  };

  return (
    <TooltipProvider openWith="click" role="dialog" onToggle={handleToggle} open={isOpen}>
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
