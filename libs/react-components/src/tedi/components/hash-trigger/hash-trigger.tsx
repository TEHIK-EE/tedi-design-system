import { cloneElement, isValidElement, ReactNode, useEffect, useRef } from 'react';

export interface HashTriggerProps {
  /**
   * HashTrigger content.
   */
  children: ReactNode;
  /**
   * Id, which is passed to first child element. It's used to detect element on page where to scroll.
   */
  id: string;
  /**
   * Callback called when hash matches.
   */
  onMatch?: (id: string) => void;
  /**
   * Scroll to element on match.
   * @default true
   */
  scrollOnMatch?: boolean;
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getHashArray(): string[] {
  const hash = window.location.hash;

  return hash
    .split('/')
    .filter((i) => i.indexOf('?') !== 0 && i.length !== 1 && i.length !== 0)
    .map((i) => (i.charAt(0) === '#' ? i.substring(1) : i));
}

export default function HashTrigger(props: HashTriggerProps) {
  const { scrollOnMatch = true, onMatch, id, children } = props;
  const isInitial = useRef(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hashes = getHashArray();

      if (hashes.indexOf(id) !== -1) {
        if (onMatch) {
          onMatch(id);
        }

        const element = document.getElementById(id);

        if (scrollOnMatch && element && !isInViewport(element)) {
          element.scrollIntoView(isInitial.current ? { behavior: 'instant' } : { behavior: 'smooth', block: 'center' });
        }
      }
    };

    if (isInitial.current) {
      handleHashChange();
      isInitial.current = false;
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [id, onMatch, scrollOnMatch]);

  return isValidElement(children) ? cloneElement(children, { id } as { id?: string }) : <div id={id}>{children}</div>;
}
