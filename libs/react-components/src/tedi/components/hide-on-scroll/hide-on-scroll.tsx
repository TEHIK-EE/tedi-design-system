import cn from 'classnames';
import { cloneElement, isValidElement, ReactNode, useEffect, useState } from 'react';

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
    scrollDistance = 100,
    scrollContainer,
    scrollDirection = 'down',
    animationDirection = 'center',
  } = props;
  const { scrollTop, clientHeight, scrollHeight } = useScroll(scrollContainer);
  const [prevScrollTop, setPrevScrollTop] = useState(scrollTop);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const bottomOffset = scrollHeight - clientHeight - scrollDistance;

    if (scrollDirection === 'down') {
      if (scrollTop > scrollDistance && scrollTop > prevScrollTop) {
        setIsHidden(true);
      } else if (scrollTop < prevScrollTop - 10 || scrollTop <= scrollDistance) {
        setIsHidden(false);
      }
    } else {
      if (scrollTop < bottomOffset && scrollTop < prevScrollTop) {
        setIsHidden(true);
      } else if (scrollTop > prevScrollTop + 10 || scrollTop >= bottomOffset) {
        setIsHidden(false);
      }
    }

    setPrevScrollTop(scrollTop);
  }, [scrollDirection, prevScrollTop, scrollDistance, scrollTop, scrollHeight, clientHeight]);

  const BEM = cn(
    styles['tedi-hide-on-scroll'],
    styles[`tedi-hide-on-scroll--${animationDirection}`],
    {
      [styles['tedi-hide-on-scroll--hidden']]: enabled && isHidden,
    },
    className
  );

  return isValidElement(children)
    ? cloneElement(children, { className: cn(children.props.className, BEM) } as { className?: string })
    : children;
};

export default HideOnScroll;
