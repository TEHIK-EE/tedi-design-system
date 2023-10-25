import { debounce } from 'debounce';
import React from 'react';

export const useElementSize = (ref: React.RefObject<HTMLElement>) => {
  const [elementSize, setElementSize] = React.useState<DOMRect | undefined>(undefined);

  React.useEffect(() => {
    const resizeEvent = debounce((): void => {
      if (ref.current) {
        setElementSize(ref.current.getBoundingClientRect());
      }
    }, 20);

    resizeEvent();

    window.addEventListener('resize', resizeEvent);
    return () => {
      resizeEvent.clear();
      window.removeEventListener('resize', resizeEvent);
    };
  }, [ref]);

  return elementSize;
};
