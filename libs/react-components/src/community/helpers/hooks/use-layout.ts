import useBreakpoint, { Breakpoint } from './use-breakpoint';

export const mobileBreakpoints: Breakpoint[] = ['xs', 'sm'];
export const tabletBreakpoints: Breakpoint[] = ['md'];
export const desktopBreakpoints: Breakpoint[] = ['lg', 'xl', 'xxl'];

export type ScreenLayout = 'mobile' | 'tablet' | 'desktop';
export type Layouts = Array<Breakpoint | ScreenLayout>;

export const useLayout = (layouts: Layouts): boolean => {
  const breakpoint = useBreakpoint();

  const breakpoints = layouts?.reduce<Breakpoint[]>((accumulator, current) => {
    switch (current) {
      case 'desktop':
        return [...accumulator, ...desktopBreakpoints];
      case 'tablet':
        return [...accumulator, ...tabletBreakpoints];
      case 'mobile':
        return [...accumulator, ...mobileBreakpoints];
      default:
        return [...accumulator, current];
    }
  }, []);

  return breakpoint ? breakpoints.includes(breakpoint) : false;
};

export default useLayout;
