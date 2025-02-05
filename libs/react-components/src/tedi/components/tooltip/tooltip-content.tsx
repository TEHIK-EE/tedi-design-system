import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { TooltipContext } from './tooltip';
import styles from './tooltip.module.scss';
import { ARROW_HEIGHT, ARROW_WIDTH } from './tooltip-provider';

export interface TooltipContentProps {
  /**
   * Tooltip content.
   */
  children: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Tooltips max width
   * @default medium
   */
  maxWidth?: 'none' | 'small' | 'medium' | 'large';
}

export const TooltipContent = (props: TooltipContentProps) => {
  const { children, maxWidth = 'medium', className } = props;
  const { open, x, y, strategy, focusManager, floating, arrowRef, getFloatingProps, placement, context } =
    useContext(TooltipContext);

  if (!open) return null;

  return (
    <FloatingPortal data-name="tooltip">
      <FloatingFocusManager {...focusManager} context={context}>
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
            },
            className: cn(styles['tedi-tooltip'], { [styles[`tedi-tooltip--${maxWidth}`]]: maxWidth }, className),
          })}
          data-placement={placement}
        >
          <FloatingArrow
            ref={(el) => (arrowRef.current = el)}
            context={context}
            className={styles['tedi-tooltip__arrow']}
            height={ARROW_HEIGHT}
            width={ARROW_WIDTH}
          />
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};
