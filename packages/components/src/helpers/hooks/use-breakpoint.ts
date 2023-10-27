import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const useBreakpoint = (): Breakpoint | null => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const resizeEvent = debounce((): void => {
      setBreakpoint(getBreakpoint());
    }, 20);

    window.addEventListener('resize', resizeEvent);
    return () => {
      resizeEvent.cancel();
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return breakpoint;
};

const getBreakpoint = (): Breakpoint | null => {
  let breakpoint: Breakpoint | null = null;

  if (typeof window !== 'undefined') {
    if (window.matchMedia('(min-width: 1400px)').matches) {
      breakpoint = 'xxl';
    } else if (window.matchMedia('(min-width: 1200px)').matches) {
      breakpoint = 'xl';
    } else if (window.matchMedia('(min-width: 992px)').matches) {
      breakpoint = 'lg';
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      breakpoint = 'md';
    } else if (window.matchMedia('(min-width: 576px)').matches) {
      breakpoint = 'sm';
    } else {
      breakpoint = 'xs';
    }
  }

  return breakpoint;
};

export default useBreakpoint;
