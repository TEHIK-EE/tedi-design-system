import { pickBy } from 'lodash-es';
import React from 'react';

import useBreakpoint, { Breakpoint, breakpoints } from './use-breakpoint';

export const useBreakpointProps = () => {
  const currentBreakpoint = useBreakpoint();
  const activeBreakpoints: Breakpoint[] = React.useMemo(
    () => (currentBreakpoint ? breakpoints.slice(0, breakpoints.indexOf(currentBreakpoint) + 1) : []),
    [currentBreakpoint]
  );

  /**
   * Return currently active breakpoints properties as merged
   * when property is used directly not as breakpoint prop (ex. `color: 'red'` not `md: { color: 'red' }`)
   * it is counted then as xs breakpoint (mobile-first approach).
   */
  const getCurrentBreakpointProps = React.useCallback(
    <T>(
      props: BreakpointSupport<T>,
      defaultValues: Partial<T> = {}
    ): Omit<BreakpointSupport<T>, Exclude<Breakpoint, 'xs'>> => {
      const { sm, md, lg, xl, xxl, ...xs } = pickBy(props, (value) => value !== undefined); // filter out props that have undefined as value
      const propArray = [...activeBreakpoints.map((bp) => (bp === 'xs' ? xs : props[bp]))].filter(Boolean);

      return Object.assign(defaultValues, ...propArray);
    },
    [activeBreakpoints]
  );

  return { getCurrentBreakpointProps };
};

export type BreakpointSupport<T> = T & {
  [key in Exclude<Breakpoint, 'xs'>]?: Partial<T>;
};
