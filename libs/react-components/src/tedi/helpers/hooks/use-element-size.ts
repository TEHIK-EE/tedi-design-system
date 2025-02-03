import debounce from 'lodash-es/debounce';
import { RefObject, useEffect, useState } from 'react';

export const useElementSize = (ref: RefObject<HTMLElement> | null) => {
  const [elementSize, setElementSize] = useState<DOMRect | undefined>(undefined);

  useEffect(() => {
    const resizeEvent = debounce(() => {
      if (ref?.current) {
        setElementSize(ref?.current.getBoundingClientRect());
      }
    }, 20);

    resizeEvent();
    window.addEventListener('resize', resizeEvent);

    return () => {
      resizeEvent.cancel();
      window.removeEventListener('resize', resizeEvent);
    };
  }, [ref]);

  return elementSize;
};
