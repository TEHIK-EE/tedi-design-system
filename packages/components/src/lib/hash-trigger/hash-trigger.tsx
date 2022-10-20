import React from 'react';

interface HashTriggerProps {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Id of the component
   */
  id: string;
  /**
   * Called when hash matches.
   */
  onMatch?: (id: string, fromHashTrigger: boolean, callback?: () => void) => void;
  /**
   * Scroll to element on match. Defaults to true
   */
  scrollOnMatch?: boolean;
}

export const getHashArray = (): string[] | false => {
  const hash = window.location.hash;

  if (hash) {
    return hash
      .split('/')
      .filter((i) => i.indexOf('?') !== 0 && i.length !== 1 && i.length !== 0)
      .map((i) => (i.charAt(0) === '#' ? i.substr(1) : i));
  } else {
    return false;
  }
};

const HashTrigger = (props: HashTriggerProps): JSX.Element => {
  const { scrollOnMatch = true, onMatch, id, children } = props;

  const isInitial = React.useRef(true);

  React.useEffect(() => {
    const handleHashChange = (): void => {
      const hashes = getHashArray();

      if (hashes && hashes.indexOf(id) !== -1) {
        const cb = () => {
          const element = document.getElementById(id);
          // trigger scroll only if scrollOnMatch is true
          if (scrollOnMatch && element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        };

        if (onMatch) {
          onMatch(id, true, cb);
        } else {
          cb();
        }
      }
    };

    if (isInitial.current) {
      isInitial.current = false;
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [id, onMatch, scrollOnMatch, isInitial]);

  return <>{children}</>;
};

export { HashTrigger as default };
export type { HashTriggerProps };
