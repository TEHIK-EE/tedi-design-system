import cn from 'classnames';
import { JSX, useState } from 'react';

import { Button, ButtonProps, Icon, Tooltip } from '../../../../tedi';
import Dropdown, { DropdownItem } from '../dropdown/dropdown';
import styles from './action-button.module.scss';

export interface ActionButtonProps extends Omit<ButtonProps, 'size'> {
  /**
   * Size of the button. Can be:
   * - `'default'` – standard size.
   * - `'small'` – smaller button for compact UIs.
   */
  size?: 'default' | 'small';
  /**
   * Name of the icon to display inside the button (e.g., Material Symbols name).
   * If set, the icon appears alongside or instead of the label.
   */
  icon?: string;
  /**
   * Whether the button is in a selected state.
   * Useful for toggles or filter-style buttons.
   */
  selected?: boolean;
  /**
   * If `true`, hides the label visually (icon-only button).
   * Label may still be available to screen readers.
   */
  hideLabel?: boolean;
  /**
   * Content to show in a tooltip on hover or focus.
   * Can be a string or a React element for custom tooltips.
   */
  tooltipContent?: string | React.ReactNode;
  /**
   * Optional dropdown menu items.
   * When provided, the button can toggle a dropdown menu.
   */
  dropdownItems?: DropdownItem[];
}

export const ActionButton = (props: ActionButtonProps): JSX.Element => {
  const {
    size = 'default',
    icon,
    selected = false,
    className,
    children,
    hideLabel = false,
    tooltipContent = children,
    dropdownItems,
    ...rest
  } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isSelected = selected || isDropdownOpen;

  const actionButtonBEM = cn(
    styles['tedi-action-button'],
    styles[`tedi-action-button--${size}`],
    isSelected && styles['tedi-action-button--selected'],
    dropdownItems && styles['tedi-action-button--dropdown'],
    className
  );

  const buttonContent = (
    <>
      {icon && <Icon name={icon} className={styles['tedi-action-button__icon']} size={size === 'small' ? 24 : 18} />}
      {!hideLabel && <div className={cn(styles['tedi-action-button__text'])}>{children}</div>}
    </>
  );

  const buttonElement = (
    <Button noStyle className={actionButtonBEM} size={size} {...rest}>
      {buttonContent}
    </Button>
  );

  const buttonWithTooltip =
    hideLabel && tooltipContent ? (
      <Tooltip placement="right">
        <Tooltip.Trigger>{buttonElement}</Tooltip.Trigger>
        <Tooltip.Content>{tooltipContent}</Tooltip.Content>
      </Tooltip>
    ) : (
      buttonElement
    );

  if (dropdownItems) {
    return (
      <Dropdown onOpenChange={setIsDropdownOpen} placement="right-start">
        <Dropdown.Trigger>{buttonElement}</Dropdown.Trigger>
        <Dropdown.Content
          items={dropdownItems.map((item) => ({
            children: item.children,
            onClick: item.onClick,
            isDisabled: item.isDisabled,
          }))}
        />
      </Dropdown>
    );
  }

  return buttonWithTooltip;
};

export default ActionButton;
