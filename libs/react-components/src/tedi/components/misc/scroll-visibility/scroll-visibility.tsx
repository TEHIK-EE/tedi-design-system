import cn from 'classnames';
import { cloneElement, isValidElement, ReactNode, useEffect, useRef, useState } from 'react';

import { useScroll } from '../../../helpers/hooks/use-scroll';
import styles from './scroll-visibility.module.scss';

export type AnimationDirection = 'left' | 'right' | 'down' | 'up' | 'center';

export interface ScrollVisibilityProps {
  /**
   * Content to hide/show
   */
  children: ReactNode;
  /**
   * Additional class name which applies to first child element
   */
  className?: string;
  /**
   * Conditionally enable the functionality
   * @default true
   */
  enabled?: boolean;
  /**
   * Determines wheter to hide or show when scrolled past scrollDistance
   * @default hide
   */
  visibility?: 'hide' | 'show';
  /**
   * Determines if the component's visibility toggles when scrolling opposite direction after crossing scrollDistance
   * @default false
   */
  toggleVisibility?: boolean;
  /**
   * Distance in px user has to scroll for the component to show/hide
   * @default 100
   */
  scrollDistance?: number;
  /**
   * Direction used to calculate `scrollDistance`:
   * - down: Measured from the top of the page.
   * - up: Measured from the bottom of the page.
   * @default down
   */
  scrollDirection?: 'up' | 'down';
  /**
   * Detect scroll based on this element
   * @default document.documentElement
   */
  scrollContainer?: HTMLElement;
  /**
   * Direction the component animates to
   * @default center
   */
  animationDirection?: AnimationDirection;
}

export const ScrollVisibility = (props: ScrollVisibilityProps) => {
  const {
    children,
    enabled = true,
    className,
    visibility = 'hide',
    toggleVisibility = false,
    scrollDistance = 100,
    scrollDirection = 'down',
    scrollContainer,
    animationDirection = 'center',
  } = props;
  const { scrollTop, scrollHeight, clientHeight } = useScroll(scrollContainer);
  const [isHidden, setIsHidden] = useState(() => {
    if (!enabled) return false;
    const currentScrollDistance = scrollDirection === 'down' ? scrollTop : scrollHeight - clientHeight - scrollTop;

    if (visibility === 'hide') {
      return currentScrollDistance > scrollDistance;
    } else {
      return currentScrollDistance <= scrollDistance;
    }
  });
  const lastScrollTop = useRef(scrollDirection === 'down' ? scrollTop : scrollHeight - clientHeight - scrollTop);

  useEffect(() => {
    if (!enabled) return;

    const shouldShow = visibility === 'show';
    const currentScrollDistance = scrollDirection === 'down' ? scrollTop : scrollHeight - clientHeight - scrollTop;

    if (toggleVisibility && currentScrollDistance < lastScrollTop.current) {
      setIsHidden(shouldShow);
    } else if (currentScrollDistance > scrollDistance) {
      setIsHidden(!shouldShow);
    } else {
      setIsHidden(shouldShow);
    }

    lastScrollTop.current = currentScrollDistance;
  }, [visibility, toggleVisibility, scrollDistance, scrollTop, enabled, scrollDirection, scrollHeight, clientHeight]);

  const BEM = cn(
    styles['tedi-scroll-visibility'],
    styles[`tedi-scroll-visibility--${animationDirection}`],
    {
      [styles['tedi-scroll-visibility--hidden']]: enabled && isHidden,
    },
    className
  );

  return isValidElement(children) ? (
    cloneElement(children, { className: cn(children.props.className, BEM) } as { className?: string })
  ) : (
    <div className={BEM}>{children}</div>
  );
};

export default ScrollVisibility;
