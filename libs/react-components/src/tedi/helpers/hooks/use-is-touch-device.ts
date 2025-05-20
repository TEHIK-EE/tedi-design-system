import { useEffect, useState } from 'react';

import { UnknownType } from '../../types/commonTypes';

export const useIsTouchDevice = () => {
  let result = false;
  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    let unregister: (() => void) | undefined;

    // Only run in the browser, importing what-input outside useEffect cause hydration errors on next
    import('what-input').then((whatInput: UnknownType) => {
      whatInput.registerOnChange(setCurrentInput, 'intent');
      unregister = () => whatInput.unRegisterOnChange(setCurrentInput);
    });

    return () => {
      if (unregister) unregister();
    };
  }, []);

  // Prevent SSR errors
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    if (window.PointerEvent && 'maxTouchPoints' in navigator) {
      if (navigator.maxTouchPoints > 0) {
        result = true;
      }
    } else {
      if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        result = true;
      } else if ('ontouchstart' in window) {
        result = true;
      }
    }
  }

  return result && currentInput !== 'keyboard';
};
