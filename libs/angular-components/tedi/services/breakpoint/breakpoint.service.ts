import { computed, Injectable, InputSignal, Signal, signal } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

const breakpointsOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

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
  private readonly _currentBreakpoint = signal<Breakpoint | undefined>(
    undefined,
  );
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(
        Object.values(BREAKPOINTS).map((value) => `(min-width: ${value}px)`),
      )
      .subscribe((state) => {
        if (state.breakpoints[`(min-width: ${BREAKPOINTS.xxl}px)`]) {
          this._currentBreakpoint.set("xxl");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.xl}px)`]) {
          this._currentBreakpoint.set("xl");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.lg}px)`]) {
          this._currentBreakpoint.set("lg");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.md}px)`]) {
          this._currentBreakpoint.set("md");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.sm}px)`]) {
          this._currentBreakpoint.set("sm");
        } else if (state.breakpoints[`(min-width: ${BREAKPOINTS.xs}px)`]) {
          this._currentBreakpoint.set("xs");
        } else {
          this._currentBreakpoint.set(undefined);
        }
      });
  }

  currentBreakpoint() {
    return computed(() => {
      return this._currentBreakpoint();
    });
  }

  getBreakpointInputs<TInputs>(
    inputs: BreakpointInputsWithoutSignals<TInputs>,
  ): TInputs {
    let resolvedInputs: Partial<TInputs> = {};

    Object.keys(inputs).forEach((key) => {
      if (!breakpointsOrder.includes(key as Breakpoint)) {
        const baseInput = inputs[key as keyof TInputs];
        resolvedInputs[key as keyof TInputs] = baseInput;
      }
    });

    const currentBreakpoint = this._currentBreakpoint();

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

  isBelowBreakpoint(breakpoint: Breakpoint | Signal<Breakpoint>) {
    return computed(() => {
      const current = this._currentBreakpoint();

      if (!current) return false;

      const bp = typeof breakpoint === "function" ? breakpoint() : breakpoint;

      const currentIndex = breakpointsOrder.indexOf(current);
      const targetIndex = breakpointsOrder.indexOf(bp);

      return currentIndex < targetIndex;
    });
  }

  isAboveBreakpoint(breakpoint: Breakpoint | Signal<Breakpoint>) {
    return computed(() => {
      const current = this._currentBreakpoint();

      if (!current) return false;

      const bp = typeof breakpoint === "function" ? breakpoint() : breakpoint;

      const currentIndex = breakpointsOrder.indexOf(current);
      const targetIndex = breakpointsOrder.indexOf(bp);

      return currentIndex >= targetIndex;
    });
  }
}
