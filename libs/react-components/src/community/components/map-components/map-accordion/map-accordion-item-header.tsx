import cn from 'classnames';
import React, { JSX } from 'react';

import { Button, useLabels } from '../../../../tedi';
import MapDropdown, { MapDropdownItem } from '../map-dropdown/map-dropdown';
import { MapAccordionContext } from './map-accordion';
import styles from './map-accordion.module.scss';
import { MapAccordionItemContext } from './map-accordion-item';

export interface MapAccordionItemHeaderProps {
  /**
   * React content to render in header
   */
  children?: React.ReactNode;
  /**
   * Optional custom Popover element
   */
  dropdownContent?: MapDropdownItem[];
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

export const MapAccordionItemHeader = (props: MapAccordionItemHeaderProps): JSX.Element => {
  const {
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
  } = props;
  const { getLabel } = useLabels();
  const { onToggle, isOpen, renderCloseButton } = React.useContext(MapAccordionContext);
  const { id, disabled } = React.useContext(MapAccordionItemContext);

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
    styles['tedi-map-accordion__item-header'],
    styles[`tedi-map-accordion__item-header-${backgroundColor}`],
    {
      [styles['tedi-map-accordion__item-header-separator']]: hasSeparator,
    },
    className
  );

  return (
    <div
      data-name="map-accordion-item-header"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={headerClass}
      aria-expanded={isOpen(id)}
      aria-controls={`${id}-content`}
      {...rest}
    >
      <div className={styles['tedi-map-accordion__item-header-content']}>
        {title && <div className={styles['tedi-map-accordion__item-header-title']}>{title}</div>}
      </div>

      <div className={styles['tedi-map-accordion__item-header-actions']} onClick={handlePopoverClick}>
        {actions}
        {dropdownContent && (
          <MapDropdown>
            <MapDropdown.Trigger>
              <Button
                size="small"
                visualType="neutral"
                color="inverted"
                icon="more_vert"
                className={styles['tedi-map-accordion__item-toggler']}
              >
                Show more
              </Button>
            </MapDropdown.Trigger>
            <MapDropdown.Content items={dropdownContent} />
          </MapDropdown>
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
            className={styles['tedi-map-accordion__item-toggler']}
          >
            {openIcon && closeIcon ? (
              <span className={styles['tedi-map-accordion__item-toggler-icon']}>
                {isOpen(id) ? openIcon : closeIcon}
              </span>
            ) : (
              getLabel(isOpen(id) ? 'close' : 'open')
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapAccordionItemHeader;
