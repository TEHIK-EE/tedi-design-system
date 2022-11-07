import React from 'react';
import ReactDOM from 'react-dom';

import styles from './tooltip.module.scss';
import { TooltipContext } from './tooltip-provider';

export interface TooltipProps {
  /**
   * Content.
   */
  children: React.ReactNode;
}

export const Tooltip = (props: TooltipProps): JSX.Element | null => {
  const { children } = props;
  const { isMounted, open, x, y, strategy, floating, arrowRef, getFloatingProps, arrow, placement } =
    React.useContext(TooltipContext);

  const renderTooltip = (): JSX.Element | null => {
    const content = (
      <div
        {...getFloatingProps({
          ref: floating,
          style: {
            position: strategy,
            left: x ?? 0,
            top: y ?? 0,
          },
          className: styles['tooltip'],
        })}
        data-placement={placement}
      >
        <div
          ref={(el) => (arrowRef.current = el)}
          className={styles['tooltip__arrow']}
          style={{ left: arrow?.x ? arrow?.x : undefined, top: arrow?.y ? arrow?.y : undefined }}
        />
        {children}
      </div>
    );

    return !isMounted || open ? content : null;
  };

  return isMounted ? ReactDOM.createPortal(renderTooltip(), document.body) : renderTooltip();
};

export default Tooltip;
