import cn from 'classnames';
import { debounce } from 'debounce';
import React, { forwardRef } from 'react';

import styles from './scroll-fade.module.scss';

export interface ScrollFadeProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Scrollbar type
   */
  scrollType?: 'default' | 'custom';
  /**
   * Size of fade in percentages. Default to 20%
   */
  fadeSize?: '10' | '20';
  /**
   * Called when element is scrolled to top
   */
  onScrollToTop?: () => void;
  /**
   * Called when element is scrolled to bottom
   */
  onScrollToBottom?: () => void;
}

export const ScrollFade = forwardRef<HTMLDivElement, ScrollFadeProps>((props, ref): JSX.Element => {
  const { children, className, scrollType = 'custom', onScrollToBottom, onScrollToTop, fadeSize = '20' } = props;
  const [fadeTop, setFadeTop] = React.useState(false);
  const [fadeBottom, setFadeBottom] = React.useState(false);
  const element = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => element.current as HTMLDivElement);

  const handleFadeTop = React.useCallback((): void => {
    const { scrollTop } = getElementSizes();

    if (element.current) {
      if (scrollTop > 0 && !fadeTop) {
        setFadeTop(true);
      } else if (scrollTop === 0 && fadeTop) {
        setFadeTop(false);

        onScrollToTop?.();
      }
    }
  }, [fadeTop, onScrollToTop]);

  const handleFadeBottom = React.useCallback((): void => {
    const { scrollHeight, scrollTop, clientHeight } = getElementSizes();

    if (element.current) {
      if (scrollHeight - scrollTop === clientHeight && fadeBottom) {
        setFadeBottom(false);

        onScrollToBottom?.();
      } else if (clientHeight && scrollHeight - scrollTop !== clientHeight && !fadeBottom) {
        setFadeBottom(true);
      }
    }
  }, [fadeBottom, onScrollToBottom]);

  const onScroll = React.useCallback((): void => {
    handleFadeTop();
    handleFadeBottom();
  }, [handleFadeBottom, handleFadeTop]);

  const debouncedResizeHandler = debounce(onScroll, 50);

  //Check if fade is needed on mount and add resize eventListener
  React.useEffect(() => {
    onScroll();

    window.addEventListener('resize', debouncedResizeHandler);
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
      debouncedResizeHandler.clear();
    };
  }, [debouncedResizeHandler, onScroll]);

  // Check scroll after children update
  React.useEffect(() => {
    onScroll();
  }, [children, onScroll]);

  const getElementSizes = (): {
    scrollHeight: number;
    scrollTop: number;
    clientHeight: number;
  } => {
    return element.current
      ? {
          scrollHeight: Math.ceil(element.current.scrollHeight),
          scrollTop: Math.ceil(element.current.scrollTop),
          clientHeight: element.current.clientHeight,
        }
      : {
          scrollHeight: 0,
          scrollTop: 0,
          clientHeight: 0,
        };
  };

  const ScrollFadeBEM = cn(
    styles['scroll-fade'],
    className,
    { [styles[`has-scrolled-to-top-${fadeSize}`]]: fadeBottom },
    { [styles[`has-scrolled-to-bottom-${fadeSize}`]]: fadeTop },
    { [styles[`scroll-fade--${scrollType}-scroll`]]: scrollType === 'custom' }
  );

  return (
    <div data-name="scroll-fade" className={ScrollFadeBEM}>
      <div className={styles['scroll-fade__inner']} ref={element} onScroll={onScroll} tabIndex={0}>
        {children}
      </div>
    </div>
  );
});

ScrollFade.displayName = 'ScrollFade';

export default ScrollFade;
