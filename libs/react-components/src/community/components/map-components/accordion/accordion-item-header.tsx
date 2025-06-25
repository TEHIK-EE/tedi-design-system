import cn from 'classnames';
import React, { JSX } from 'react';

import { Button, useLabels } from '../../../../tedi';
import Dropdown, { DropdownItem } from '../dropdown/dropdown';
import { AccordionContext } from './accordion';
import styles from './accordion.module.scss';
import { AccordionItemContext } from './accordion-item';

export interface AccordionItemHeaderProps {
  /**
   * React content to render in header
   */
  children?: React.ReactNode;
  /**
   * Optional custom Popover element
   */
  dropdownContent?: DropdownItem[];
  /**
   * @default primary
   * Background color for Accordion header
   */
  backgroundColor?: 'primary' | 'secondary';
  hasSeparator?: boolean;
  renderToggleButton?: boolean;
  /** Optional icon override when item is open */
  openIcon?: string | JSX.Element;
  /** Optional icon override when item is closed */
  closeIcon?: string | JSX.Element;
  /** Title rendered before children in header */
  title?: string | React.ReactNode;
  /** Optional custom content in action area (before dropdowns/buttons) */
  actions?: React.ReactNode;
  className?: string;
}

export const AccordionItemHeader = ({
  children,
  className,
  dropdownContent,
  backgroundColor = 'primary',
  hasSeparator = false,
  renderToggleButton = true,
  openIcon,
  closeIcon,
  title,
  actions,
  ...rest
}: AccordionItemHeaderProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { onToggle, isOpen, renderCloseButton } = React.useContext(AccordionContext);
  const { id, disabled } = React.useContext(AccordionItemContext);

  const handleClick = () => {
    if (!disabled) onToggle(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
      e.preventDefault();
      handleClick();
    }
  };

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const headerClass = cn(
    styles['tedi-accordion__item-header'],
    styles[`tedi-accordion__item-header-${backgroundColor}`],
    {
      [styles['tedi-accordion__item-header-separator']]: hasSeparator,
    },
    className
  );

  return (
    <div
      data-name="accordion-item-header"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={headerClass}
      aria-expanded={isOpen(id)}
      aria-controls={`${id}-content`}
      {...rest}
    >
      <div className={styles['tedi-accordion__item-header-content']}>
        {title && <div className={styles['tedi-accordion__item-header-title']}>{title}</div>}
      </div>

      <div className={styles['tedi-accordion__item-header-actions']} onClick={handlePopoverClick}>
        {actions}
        {dropdownContent && (
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                size="small"
                visualType="neutral"
                color="inverted"
                icon="more_vert"
                className={styles['tedi-accordion__item-toggler']}
              >
                Show more
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content items={dropdownContent} />
          </Dropdown>
        )}
        {renderCloseButton && renderCloseButton(id)}
        {renderToggleButton && (
          <Button
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            size="small"
            visualType="neutral"
            color="inverted"
            icon={!openIcon && !closeIcon ? (isOpen(id) ? 'expand_more' : 'chevron_right') : undefined}
            className={styles['tedi-accordion__item-toggler']}
          >
            {openIcon && closeIcon ? (
              <span className={styles['tedi-accordion__item-toggler-icon']}>{isOpen(id) ? openIcon : closeIcon}</span>
            ) : (
              getLabel(isOpen(id) ? 'close' : 'open')
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccordionItemHeader;
