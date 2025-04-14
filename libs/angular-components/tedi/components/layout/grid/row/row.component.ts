import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import {
  BreakpointService,
  BreakpointInputs,
} from "../../../../services/breakpoint/breakpoint.service";

const GAP_MAP: Record<number, string> = {
  0: "0rem",
  1: "0.25rem",
  2: "0.5rem",
  3: "1rem",
  4: "1.5rem",
  5: "3rem",
};

export type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
export type Gap = 0 | 1 | 2 | 3 | 4 | 5;
export type JustifyItems = "start" | "end" | "center" | "stretch";
export type AlignItems = "start" | "end" | "center" | "stretch";
export type RowInputs = {
  /**
   * The number of columns that will fit next to each other.
   * @default auto
   */
  cols: Cols;
  /**
   * Applies minimum width (px) to the column when using auto layout.
   * @default 200px
   */
  minColWidth: number;
  /**
   * Aligns items horizontally inside their grid cell.
   */
  justifyItems?: JustifyItems;
  /**
   * Aligns items vertically inside their grid cell.
   */
  alignItems?: AlignItems;
  /**
   * Add gap between items.
   */
  gap?: Gap;
  /**
   * Add horizontal gap between items.
   */
  gapX?: Gap;
  /**
   * Add vertical gap between items.
   */
  gapY?: Gap;
};

@Component({
  selector: "tedi-row",
  standalone: true,
  templateUrl: "./row.component.html",
  styleUrl: "./row.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "[style.--_grid-gap]": "breakpointInputs().cols === 'auto' ? gridGap() : null",
    "[style.--_grid-col-width]": "breakpointInputs().cols === 'auto' ? breakpointInputs().minColWidth + 'px' : null",
    "role": "presentation"
  }
})
export class RowComponent implements BreakpointInputs<RowInputs> {
  cols = input<Cols>("auto");
  minColWidth = input<number>(200);
  justifyItems = input<JustifyItems>();
  alignItems = input<AlignItems>();
  gap = input<Gap>();
  gapX = input<Gap>();
  gapY = input<Gap>();

  xs = input<RowInputs>();
  sm = input<RowInputs>();
  md = input<RowInputs>();
  lg = input<RowInputs>();
  xl = input<RowInputs>();
  xxl = input<RowInputs>();

  breakpointService = inject(BreakpointService);
  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<RowInputs>({
      cols: this.cols(),
      minColWidth: this.minColWidth(),
      justifyItems: this.justifyItems(),
      alignItems: this.alignItems(),
      gap: this.gap(),
      gapX: this.gapX(),
      gapY: this.gapY(),
      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });

  gridGap = computed(() => {
    const gap = this.breakpointInputs().gap;
    const gapX = this.breakpointInputs().gapX;
    const gapValue = gap ?? gapX;
    return GAP_MAP[gapValue ?? 0];
  });

  classes = computed(() => {
    const classList = ["row", `row--cols-${this.breakpointInputs().cols}`];

    if (this.breakpointInputs().justifyItems) {
      classList.push(
        `row--justify-items-${this.breakpointInputs().justifyItems}`,
      );
    }

    if (this.breakpointInputs().alignItems) {
      classList.push(`row--align-items-${this.breakpointInputs().alignItems}`);
    }

    if (this.breakpointInputs().gap !== undefined) {
      classList.push(`g-${this.breakpointInputs().gap}`);
    }

    if (this.breakpointInputs().gapX !== undefined) {
      classList.push(`gx-${this.breakpointInputs().gapX}`);
    }

    if (this.breakpointInputs().gapY !== undefined) {
      classList.push(`gy-${this.breakpointInputs().gapY}`);
    }

    return classList.join(" ");
  });
}
