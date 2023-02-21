import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import styles from './tooltip.module.scss';
import { TooltipContext } from './tooltip-provider';

export interface TooltipProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Tooltips max width
   * @default medium
   */
  maxWidth?: 'none' | 'small' | 'medium' | 'large';
}

export const Tooltip = (props: TooltipProps): JSX.Element | null => {
  const { children, maxWidth = 'medium' } = props;
  const { open, x, y, strategy, focusManager, floating, arrowRef, getFloatingProps, arrow, placement, context } =
    React.useContext(TooltipContext);

  const renderTooltip = (): JSX.Element | null => {
    const content = (
      <FloatingFocusManager {...focusManager} context={context}>
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
            },
            className: cn(styles['tooltip'], { [styles[`tooltip--${maxWidth}`]]: maxWidth }),
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
      </FloatingFocusManager>
    );

    return open ? content : null;
  };

  return <FloatingPortal data-name="tooltip">{renderTooltip()}</FloatingPortal>;
};

export default Tooltip;
