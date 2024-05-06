import cn from 'classnames';
import React, { forwardRef } from 'react';

import { useScroll } from '../..';
import styles from './hide-on-scroll.module.scss';

export type AnimationDirection = 'left' | 'right' | 'down' | 'up' | 'center';

export interface HideOnScrollProps {
  /**
   * Content
   */
  children: React.ReactNode;
  /**
   * Conditionally enable the functionality
   * @default true
   */
  enabled?: boolean;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Direction the component animates to
   * @default center
   */
  animationDirection?: AnimationDirection;
  /**
   * Hide the component when user scrolls in that direction
   * @default down
   */
  scrollDirection?: 'down' | 'up';
  /**
   * Distance in px from `hideDirection` that the user has to scroll for the component to show/hide
   * @default 100
   */
  scrollDistance?: number;
  /**
   * Detect scroll based on this element
   * @default window
   */
  scrollContainer?: Window | HTMLElement;
}

/**
 * This component hides its content when page is scrolled.
 * It's useful to maximize available screen space on smaller screens and mostly meant to be used inside `Affix` component
 */
export const HideOnScroll = forwardRef<HTMLDivElement, HideOnScrollProps>((props, ref): JSX.Element => {
  const {
    children,
    enabled = true,
    className,
    scrollDistance = 100,
    scrollContainer = window,
    scrollDirection = 'down',
    animationDirection = 'center',
  } = props;
  const { scrollPos, clientHeight, scrollHeight } = useScroll(scrollContainer);
  const [previousScrollPos, setPreviousScrollPos] = React.useState(scrollPos);
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    const topOffset = scrollDistance;
    const bottomOffset = scrollHeight - clientHeight - scrollDistance;

    if (scrollDirection === 'down') {
      if (scrollPos > topOffset && scrollPos > previousScrollPos) {
        setIsHidden(true);
      } else if (scrollPos < previousScrollPos - 10 || scrollPos <= topOffset) {
        setIsHidden(false);
      }
    } else {
      if (scrollPos < bottomOffset && scrollPos < previousScrollPos) {
        setIsHidden(true);
      } else if (scrollPos > previousScrollPos + 10 || scrollPos >= bottomOffset) {
        setIsHidden(false);
      }
    }

    setPreviousScrollPos(scrollPos);
  }, [scrollDirection, previousScrollPos, scrollDistance, scrollPos, scrollHeight, clientHeight]);

  const BEM = cn(styles['hide-on-scroll'], className, styles[`hide-on-scroll--${animationDirection}`], {
    [styles['hide-on-scroll--hidden']]: enabled && isHidden,
  });

  return (
    <div ref={ref} className={BEM}>
      {/* When something in the content is clicked and the event bubbles up, we want to keep the component visible after that */}
      <div className={styles['hide-on-scroll__content']} onClick={() => setIsHidden(false)}>
        {children}
      </div>
    </div>
  );
});

HideOnScroll.displayName = 'HideOnScroll';

export default HideOnScroll;
