import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  BreakpointService,
  BreakpointInputs,
} from "../../../../services/breakpoint/breakpoint.service";

export type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Gap = 0 | 1 | 2 | 3 | 4 | 5;
export type JustifyItems = "start" | "end" | "center" | "stretch";
export type AlignItems = "start" | "end" | "center" | "stretch";

type RowInputs = {
  /**
   * Additional class.
   */
  class: string;
  /**
   * The number of columns that will fit next to each other.
   * @default 12
   */
  cols: Cols;
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
})
export class RowComponent implements BreakpointInputs<RowInputs> {
  class = input<string>("");
  cols = input<Cols>(12);
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

  constructor(private breakpointService: BreakpointService) {}

  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<RowInputs>({
      class: this.class(),
      cols: this.cols(),
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

    if (this.breakpointInputs().gap) {
      classList.push(`g-${this.breakpointInputs().gap}`);
    }

    if (this.breakpointInputs().gapX) {
      classList.push(`gx-${this.breakpointInputs().gapX}`);
    }

    if (this.breakpointInputs().gapY) {
      classList.push(`gy-${this.breakpointInputs().gapY}`);
    }

    if (this.breakpointInputs().class) {
      classList.push(this.breakpointInputs().class);
    }

    return classList.join(" ");
  });
}
