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

export type BreakpointInputs<TInputs> = {
  [K in keyof TInputs]: InputSignal<TInputs[K]>;
} & Partial<Record<Breakpoint, InputSignal<TInputs | undefined>>>;

export type BreakpointInputsWithoutSignals<TInputs> = TInputs &
  Partial<Record<Breakpoint, TInputs>>;

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

  getBreakpointInputs<TInputs>(
    inputs: BreakpointInputsWithoutSignals<TInputs>,
  ): TInputs {
    const breakpointsOrder: Breakpoint[] = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl",
    ];

    let resolvedInputs: Partial<TInputs> = {};

    Object.keys(inputs).forEach((key) => {
      if (!breakpointsOrder.includes(key as Breakpoint)) {
        const baseInput = inputs[key as keyof TInputs];
        resolvedInputs[key as keyof TInputs] = baseInput;
      }
    });

    const currentBreakpoint = this.currentBreakpoint();

    if (!currentBreakpoint) {
      return resolvedInputs as TInputs;
    }

    for (let i = 0; i <= breakpointsOrder.indexOf(currentBreakpoint); i++) {
      const breakpoint = breakpointsOrder[i];
      const breakpointInputs = inputs[breakpoint];

      if (breakpointInputs) {
        resolvedInputs = { ...resolvedInputs, ...breakpointInputs };
      }
    }

    return resolvedInputs as TInputs;
  }
}
