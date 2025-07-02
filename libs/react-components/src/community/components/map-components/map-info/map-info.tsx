import classNames from 'classnames';
import React, { useState } from 'react';

import { Icon, Popover, PopoverContentProps } from '../../../../tedi';
import styles from './map-info.module.scss';

export interface MapInfoProps {
  /**
   * Optional configuration for rendering info content inside a popover.
   */
  popover?: PopoverContentProps;
  /**
   * The info content to display. Can be a single React node or an array of nodes.
   */
  children: React.ReactNode | React.ReactNode[];
}

const MapInfo = (props: MapInfoProps): JSX.Element => {
  const { children, popover } = props;
  const [open, setOpen] = useState(false);

  const wrapperClassName = classNames(
    [styles['tedi-map-info__wrapper'], open && styles['tedi-map-info--open']],
    popover && styles['tedi-map-info--has-popover']
  );

  const mapAttributionContent = (
    <div className={wrapperClassName}>
      {popover && (
        <Icon size={18} name={open ? 'expand_less' : 'expand_more'} className={styles['tedi-map-info__toggler']} />
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

export default MapInfo;
