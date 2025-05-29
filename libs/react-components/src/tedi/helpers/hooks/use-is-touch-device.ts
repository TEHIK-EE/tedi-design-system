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
      // if Pointer Events are supported, just check maxTouchPoints
      if (navigator.maxTouchPoints > 0) {
        result = true;
      }
    } else {
      // no Pointer Events...
      if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        // check for any-pointer:coarse which mostly means touchscreen
        result = true;
      } else if ('ontouchstart' in window) {
        // last resort - check for exposed event handler
        result = true;
      }
    }
  }

  return result && currentInput !== 'keyboard';
};
