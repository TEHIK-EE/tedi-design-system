import throttle from 'lodash-es/throttle';
import React from 'react';

export const useScroll = (element: Window | HTMLElement = window) => {
  const scrollableElement = (element as Window).window === window ? document.documentElement : (element as HTMLElement);
  const [scrollPos, setScrollPos] = React.useState(scrollableElement.scrollTop);
  const [clientHeight, setClientHeight] = React.useState(scrollableElement.clientHeight);
  const [scrollHeight, setScrollHeight] = React.useState(scrollableElement.scrollHeight);

  React.useEffect(() => {
    const listenToScroll = throttle(() => {
      setScrollPos(scrollableElement.scrollTop);
      setClientHeight(scrollableElement.clientHeight);
      setScrollHeight(scrollableElement.scrollHeight);
    }, 50);

    element.addEventListener('scroll', listenToScroll);
    listenToScroll();

    return () => {
      element.removeEventListener('scroll', listenToScroll);
      listenToScroll.cancel();
    };
  }, [element, scrollableElement]);

  return { scrollPos, clientHeight, scrollHeight };
};
