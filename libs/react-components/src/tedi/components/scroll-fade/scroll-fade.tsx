import cn from 'classnames';
import { forwardRef, useCallback, useState } from 'react';

import styles from './scroll-fade.module.scss';

export interface ScrollFadeProps {
  /**
   * ScrollFade content
   */
  children: React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Scrollbar type
   * @default custom
   */
  scrollBar?: 'default' | 'custom';
  /**
   * Size of fade in percentages.
   * @default 20
   */
  fadeSize?: 0 | 10 | 20;
  /**
   * Fade position
   * @default both
   */
  fadePosition?: 'top' | 'bottom' | 'both';
  /**
   * Called when element is scrolled to top
   */
  onScrollToTop?: () => void;
  /**
   * Called when element is scrolled to bottom
   */
  onScrollToBottom?: () => void;
}

const ScrollFade = forwardRef<HTMLDivElement, ScrollFadeProps>((props, ref): JSX.Element => {
  const {
    children,
    className,
    scrollBar = 'custom',
    onScrollToBottom,
    onScrollToTop,
    fadeSize = 20,
    fadePosition = 'both',
  } = props;
  const [fade, setFade] = useState({ top: false, bottom: false });

  const handleFade = useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      const atTop = scrollTop === 0;
      const atBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1;

      if (atTop) {
        setFade({ top: false, bottom: true });
        onScrollToTop?.();
      } else if (atBottom) {
        setFade({ top: true, bottom: false });
        onScrollToBottom?.();
      } else {
        setFade({ top: true, bottom: true });
      }
    },
    [onScrollToTop, onScrollToBottom]
  );

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
      handleFade(scrollTop, scrollHeight, clientHeight);
    },
    [handleFade]
  );

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      if (node) {
        handleFade(node.scrollTop, node.scrollHeight, node.clientHeight);
      }
    },
    [handleFade, ref]
  );

  const ScrollFadeBEM = cn(
    styles['tedi-scroll-fade'],
    { [styles[`tedi-scroll-fade--top-${fadeSize}`]]: fade.top && (fadePosition === 'both' || fadePosition === 'top') },
    {
      [styles[`tedi-scroll-fade--bottom-${fadeSize}`]]:
        fade.bottom && (fadePosition === 'both' || fadePosition === 'bottom'),
    },
    className
  );

  const ScrollFadeInnerBEM = cn(styles['tedi-scroll-fade__inner'], {
    [styles['tedi-scroll-fade__inner--custom-scroll']]: scrollBar === 'custom',
  });

  return (
    <div data-name="scroll-fade" className={ScrollFadeBEM}>
      <div ref={callbackRef} onScroll={onScroll} className={ScrollFadeInnerBEM} tabIndex={0}>
        {children}
      </div>
    </div>
  );
});

ScrollFade.displayName = 'ScrollFade';

export default ScrollFade;
