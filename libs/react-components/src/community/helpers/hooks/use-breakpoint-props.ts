import { omit, pickBy } from 'lodash-es';
import React from 'react';

import useBreakpoint, { Breakpoint, breakpoints } from './use-breakpoint';

export const useBreakpointProps = (defaultServerBreakpoint: Breakpoint = 'xs') => {
  const currentBreakpoint = useBreakpoint(defaultServerBreakpoint);
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
    ): Omit<BreakpointSupport<T>, Exclude<Breakpoint, 'xs'> | 'defaultServerBreakpoint'> => {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { sm, md, lg, xl, xxl, ...xs } = props;
      const propArray = [
        ...activeBreakpoints.map((bp) => pickBy(bp === 'xs' ? xs : props[bp], (value) => value !== undefined)), // filter out props that have undefined as value, so they don't override lower breakpoint values or default values
      ].filter(Boolean);

      // Add propArray to defaultValues
      // and remove defaultServerBreakpoint from defaultValues - to avoided passing to HTML element with rest props
      return Object.assign(omit(defaultValues, 'defaultServerBreakpoint'), ...propArray);
    },
    [activeBreakpoints]
  );

  return { getCurrentBreakpointProps };
};

/**
 * BreakpointSupport is a utility type that allows you to define props for different breakpoints.
 * It extends the given type T and adds optional properties for each breakpoint except 'xs'.
 * This is useful for creating responsive components that can have different props based on the current breakpoint.
 * Also defaultServerBreakpoint is added to the type, so you can set a default value for the component, when it's rendered on the server-side.
 * Because in SSR we don't have access to the window object and can't know the user's screen size.
 */
export type BreakpointSupport<T> = T & {
  /**
   * Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side.
   */
  defaultServerBreakpoint?: Breakpoint;
} & {
  [key in Exclude<Breakpoint, 'xs'>]?: Partial<T>;
};
