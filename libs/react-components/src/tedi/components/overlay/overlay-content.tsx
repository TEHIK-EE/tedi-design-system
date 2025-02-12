import { FloatingArrow, FloatingFocusManager, FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import { ReactNode, useContext } from 'react';

import { OverlayContext } from './overlay';

export interface OverlayContentProps {
  /**
   * Content.
   */
  children: ReactNode;
  /**
   * Additional class names.
   */
  classNames: {
    content: string;
    arrow: string;
  };
}

export const OverlayContent = (props: OverlayContentProps) => {
  const { children, classNames } = props;
  const {
    open,
    x,
    y,
    strategy,
    focusManager,
    floating,
    arrowRef,
    getFloatingProps,
    placement,
    context,
    arrow,
    scrollLock,
  } = useContext(OverlayContext);

  if (!open) return null;

  return (
    <FloatingPortal data-name="tooltip">
      <FloatingOverlay lockScroll={scrollLock}>
        <FloatingFocusManager {...focusManager} context={context}>
          <div
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                left: x ?? 0,
                top: y ?? 0,
              },
              className: classNames.content,
            })}
            data-placement={placement}
          >
            <FloatingArrow
              ref={(el) => (arrowRef.current = el)}
              context={context}
              className={classNames.arrow}
              height={arrow?.height}
              width={arrow?.width}
            />
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};
