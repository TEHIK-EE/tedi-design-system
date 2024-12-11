import cn from 'classnames';
import { cloneElement, isValidElement, ReactNode, useEffect, useRef, useState } from 'react';

import { useScroll } from '../../helpers/hooks/use-scroll';
import styles from './hide-on-scroll.module.scss';

export type AnimationDirection = 'left' | 'right' | 'down' | 'up' | 'center';

export interface HideOnScrollProps {
  /**
   * Content to hide/show
   */
  children: ReactNode;
  /**
   * Conditionally enable the functionality
   * @default true
   */
  enabled?: boolean;
  /**
   * Additional class name which applies to first child element
   */
  className?: string;
  /**
   * Determines wheter to hide or show on scroll
   * @default show
   */
  visibility?: 'hide' | 'show';
  /**
   * Determines if the component's visibility toggles when scrolling up after crossing scrollDistance
   * @default false
   */
  toggleVisibility?: boolean;
  /**
   * Direction the component animates to
   * @default center
   */
  animationDirection?: AnimationDirection;
  /**
   * Distance in px user has to scroll for the component to show/hide
   * @default 100
   */
  scrollDistance?: number;
  /**
   * Detect scroll based on this element
   * @default document.documentElement
   */
  scrollContainer?: HTMLElement;
}

export const HideOnScroll = (props: HideOnScrollProps) => {
  const {
    children,
    enabled = true,
    className,
    visibility = 'show',
    toggleVisibility = false,
    scrollDistance = 100,
    scrollContainer,
    animationDirection = 'center',
  } = props;
  const { scrollTop } = useScroll(scrollContainer);
  const [isHidden, setIsHidden] = useState(() => {
    if (!enabled) return false;

    if (visibility === 'hide') {
      return scrollTop > scrollDistance;
    } else {
      return scrollTop <= scrollDistance;
    }
  });
  const lastScrollTop = useRef(scrollTop);

  useEffect(() => {
    if (!enabled) return;

    const shouldShow = visibility === 'show';

    if (toggleVisibility && scrollTop < lastScrollTop.current) {
      setIsHidden(shouldShow);
    } else if (scrollTop > scrollDistance) {
      setIsHidden(!shouldShow);
    } else {
      setIsHidden(shouldShow);
    }

    lastScrollTop.current = scrollTop;
  }, [visibility, toggleVisibility, scrollDistance, scrollTop, enabled]);

  const BEM = cn(
    styles['tedi-hide-on-scroll'],
    styles[`tedi-hide-on-scroll--${animationDirection}`],
    {
      [styles['tedi-hide-on-scroll--hidden']]: enabled && isHidden,
    },
    className
  );

  return isValidElement(children) ? (
    cloneElement(children, { className: cn(children.props.className, BEM) } as { className?: string })
  ) : (
    <div className={BEM}>{children}</div>
  );
};

export default HideOnScroll;
