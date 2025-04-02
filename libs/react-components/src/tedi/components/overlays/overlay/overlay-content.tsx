import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { ReactNode, useContext, useEffect } from 'react';

import { OverlayContext } from './overlay';

export interface OverlayContentProps {
  /**
   * Content.
   */
  children: ReactNode | ReactNode[];
  /**
   * Additional class names.
   */
  classNames?: {
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

  useEffect(() => {
    if (scrollLock) {
      if (open) {
        document.documentElement.style.overflow = 'hidden';
        const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;

        if (hasScrollbar) {
          document.body.style.overflow = 'scroll';
        }
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    }
  }, [open, scrollLock]);

  if (!open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager {...focusManager} context={context}>
        <div
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              left: x,
              top: y,
            },
            className: classNames?.content,
          })}
          data-placement={placement}
          data-testid="overlay-content"
        >
          <FloatingArrow
            ref={(el) => (arrowRef.current = el)}
            context={context}
            className={classNames?.arrow}
            height={arrow?.height}
            width={arrow?.width}
            data-testid="overlay-arrow"
          />
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};
