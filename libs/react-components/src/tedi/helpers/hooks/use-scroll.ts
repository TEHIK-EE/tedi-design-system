import throttle from 'lodash-es/throttle';
import { useEffect, useState } from 'react';

export const useScroll = (element?: HTMLElement) => {
  const scrollableElement = element ?? document.documentElement;
  const [scroll, setScroll] = useState({
    scrollTop: scrollableElement.scrollTop,
    scrollHeight: scrollableElement.scrollHeight,
    clientHeight: scrollableElement.clientHeight,
  });

  useEffect(() => {
    const listenToScroll = throttle(() => {
      setScroll({
        scrollTop: scrollableElement.scrollTop,
        scrollHeight: scrollableElement.scrollHeight,
        clientHeight: scrollableElement.clientHeight,
      });
    }, 50);

    (element ?? window).addEventListener('scroll', listenToScroll);
    listenToScroll();

    return () => {
      (element ?? window).removeEventListener('scroll', listenToScroll);
      listenToScroll.cancel();
    };
  }, [scrollableElement, element]);

  return scroll;
};
