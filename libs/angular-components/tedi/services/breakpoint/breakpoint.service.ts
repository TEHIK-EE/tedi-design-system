import { Injectable, InputSignal, signal } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export type BreakpointProps<TProps> = {
  [K in keyof TProps]: InputSignal<TProps[K]>;
} & Partial<Record<Breakpoint, InputSignal<TProps | undefined>>>;

export type BreakpointPropsWithoutSignals<TProps> = TProps &
  Partial<Record<Breakpoint, TProps>>;

@Injectable({
  providedIn: "root",
})
export class BreakpointService {
  private currentBreakpoint = signal<Breakpoint | undefined>(undefined);
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(
        Object.values(BREAKPOINTS).map((value) => `(min-width: ${value}px)`),
      )
      .subscribe((state) => {
        if (state.breakpoints[`(min-width: ${BREAKPOINTS.xxl}px)`]) {
          this.currentBreakpoint.set("xxl");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.xl}px)`]) {
          this.currentBreakpoint.set("xl");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.lg}px)`]) {
          this.currentBreakpoint.set("lg");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.md}px)`]) {
          this.currentBreakpoint.set("md");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.sm}px)`]) {
          this.currentBreakpoint.set("sm");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.xs}px)`]) {
          this.currentBreakpoint.set("xs");
        } else {
          this.currentBreakpoint.set(undefined);
        }
      });
  }

  getBreakpoint() {
    return this.currentBreakpoint();
  }

  getBreakpointProps<TProps>(
    props: BreakpointPropsWithoutSignals<TProps>,
  ): TProps {
    const breakpointsOrder: Breakpoint[] = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl",
    ];

    let resolvedProps: Partial<TProps> = {};

    Object.keys(props).forEach((key) => {
      if (!breakpointsOrder.includes(key as Breakpoint)) {
        const baseProp = props[key as keyof TProps];
        resolvedProps[key as keyof TProps] = baseProp;
      }
    });

    const currentBreakpoint = this.currentBreakpoint();

    if (!currentBreakpoint) {
      return resolvedProps as TProps;
    }

    for (let i = 0; i <= breakpointsOrder.indexOf(currentBreakpoint); i++) {
      const breakpoint = breakpointsOrder[i];
      const breakpointProps = props[breakpoint];

      if (breakpointProps) {
        resolvedProps = { ...resolvedProps, ...breakpointProps };
      }
    }

    return resolvedProps as TProps;
  }
}
