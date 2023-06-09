import React from 'react';

export interface LoaderObj {
  id: string;
  mountLabel?: string;
  unmountLabel?: string;
}

export interface IAccessibilityContext {
  addLoader: (loader: LoaderObj) => void;
  removeLoader: (id: string) => void;
}

export const AccessibilityContext = React.createContext<IAccessibilityContext | null>(null);

export interface AccessibilityProviderProps {
  /**
   * Rest of the App code
   */
  children: React.ReactNode;
}

/**
 * We don't export this separately from the library. It is baked into the <Layout> component.
 */
export const AccessibilityProvider = (props: AccessibilityProviderProps): JSX.Element => {
  const { children } = props;
  const [activeLoaders, setActiveLoaders] = React.useState<LoaderObj[]>([]);
  const [completedLoaders, setCompletedLoaders] = React.useState<LoaderObj[]>([]);
  const context = React.useContext(AccessibilityContext); // check if context already exists and prevent rendering provider again

  const addLoader = React.useCallback((loader: LoaderObj) => {
    setActiveLoaders((prevState) => [...prevState, loader]);
  }, []);

  const removeLoader = React.useCallback(
    (id: string) => {
      const loader = activeLoaders.find((loader) => loader.id === id);

      if (loader) {
        setActiveLoaders((prevState) => prevState.filter((loader) => loader.id !== id));
        setCompletedLoaders((prevState) => [...prevState, loader]);

        // remove completed loader from array after it has been read.
        // we don't have to wait until the message is fully read. As long as the message is rendered in the dom it will get added to the speech stack
        setTimeout(() => {
          setCompletedLoaders((prevState) => prevState.filter((loader) => loader.id !== id));
        }, 1000);
      }
    },
    [activeLoaders]
  );

  return context ? (
    <>{children}</>
  ) : (
    <AccessibilityContext.Provider value={{ addLoader, removeLoader }}>
      <div className="sr-only">
        <div role="status" aria-live="polite" aria-atomic={false} aria-relevant="additions">
          {activeLoaders.map((loader) => (
            <p key={loader.id}>{loader.mountLabel}</p>
          ))}
        </div>
        <div role="status" aria-live="polite" aria-atomic={false} aria-relevant="additions">
          {completedLoaders.map((loader) => (
            <p key={loader.id}>{loader.unmountLabel}</p>
          ))}
        </div>
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
};
