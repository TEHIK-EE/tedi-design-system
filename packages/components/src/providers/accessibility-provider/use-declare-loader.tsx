import React from 'react';

import { AccessibilityContext, IAccessibilityContext } from './accessibility-provider';

const useDeclareLoader = (mountLabel: string, unmountLabel: string, delay?: number): void => {
  const context = React.useContext(AccessibilityContext);
  const addLoaderRef = React.useRef<IAccessibilityContext['addLoader']>();
  const removeLoaderRef = React.useRef<IAccessibilityContext['removeLoader']>();
  const id = React.useId();

  if (!context) {
    console.error('AccessibilityContext does not exist');
  }

  React.useEffect(() => {
    addLoaderRef.current = context?.addLoader;
    removeLoaderRef.current = context?.removeLoader;
  }, [context?.addLoader, context?.removeLoader]);

  // run only once on first mount and last unmount
  React.useEffect(() => {
    if (context && mountLabel && unmountLabel) {
      // only add a loader when it has been visible for certain amount of time
      const timeout = setTimeout(() => {
        addLoaderRef.current?.({ id, mountLabel, unmountLabel });
      }, delay);

      return () => {
        clearTimeout(timeout);
        removeLoaderRef.current?.(id);
      };
    }

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useDeclareLoader };
