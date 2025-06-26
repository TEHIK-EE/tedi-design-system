import classNames from 'classnames';
import React, { useState } from 'react';

import { Icon, Popover, PopoverContentProps } from '../../../../tedi';
import styles from './map-attribution.module.scss';

export interface MapAttributionProps {
  /**
   * Optional configuration for rendering attribution content inside a popover.
   */
  popover?: PopoverContentProps;
  /**
   * The attribution content to display. Can be a single React node or an array of nodes.
   */
  children: React.ReactNode | React.ReactNode[];
}

const MapAttribution = (props: MapAttributionProps) => {
  const { children, popover } = props;
  const [open, setOpen] = useState(false);

  const wrapperClassName = classNames(
    [styles['tedi-map-attribution__wrapper'], open && styles['tedi-map-attribution--open']],
    popover && styles['tedi-map-attribution--has-popover']
  );

  const mapAttributionContent = (
    <div className={wrapperClassName}>
      {popover && (
        <Icon
          size={18}
          name={open ? 'expand_less' : 'expand_more'}
          className={styles['tedi-map-attribution__toggler']}
        />
      )}
      {children}
    </div>
  );

  if (popover) {
    return (
      <Popover open={open} onToggle={() => setOpen(!open)}>
        <Popover.Trigger>{mapAttributionContent}</Popover.Trigger>
        <Popover.Content {...popover}>{popover?.children}</Popover.Content>
      </Popover>
    );
  } else {
    return mapAttributionContent;
  }
};

export default MapAttribution;
