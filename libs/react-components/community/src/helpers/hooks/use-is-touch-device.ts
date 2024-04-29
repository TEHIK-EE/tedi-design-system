import React from 'react';
import whatInput from 'what-input';

export const useIsTouchDevice = () => {
  let result = false;
  const [currentInput, setCurrentInput] = React.useState('');

  React.useEffect(() => {
    whatInput.registerOnChange(setCurrentInput, 'intent');

    return () => {
      whatInput.unRegisterOnChange(setCurrentInput);
    };
  }, []);

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

  return result && currentInput !== 'keyboard';
};
