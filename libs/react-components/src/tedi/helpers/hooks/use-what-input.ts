import React from 'react';

/**
 * This hook is used to load the what-input library. It is used to detect the input method used by the user (e.g. keyboard, mouse, touch).
 * It is loaded only once when the component is mounted to avoid loading while SSR.
 * All the applications should use this hook to load the what-input library. By default it is baked into the <Layout> component.
 */
export function useWhatInput() {
  React.useEffect(() => {
    import('what-input');
  }, []);
}
