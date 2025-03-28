import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  BreakpointProps,
  BreakpointService,
} from "../../../../services/breakpoint/breakpoint.service";

export type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Gap = 0 | 1 | 2 | 3 | 4 | 5;
export type JustifyItems = "start" | "end" | "center" | "stretch";
export type AlignItems = "start" | "end" | "center" | "stretch";

type RowProps = {
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
export class RowComponent implements BreakpointProps<RowProps> {
  class = input<string>("");
  cols = input<Cols>(12);
  justifyItems = input<JustifyItems>();
  alignItems = input<AlignItems>();
  gap = input<Gap>();
  gapX = input<Gap>();
  gapY = input<Gap>();

  xs = input<RowProps>();
  sm = input<RowProps>();
  md = input<RowProps>();
  lg = input<RowProps>();
  xl = input<RowProps>();
  xxl = input<RowProps>();

  constructor(private breakpointService: BreakpointService) {}

  classes = computed(() => {
    const resolvedProps = this.breakpointService.getBreakpointProps<RowProps>({
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

    const classList = ["row", `row--cols-${resolvedProps.cols}`];

    if (resolvedProps.justifyItems) {
      classList.push(`row--justify-items-${resolvedProps.justifyItems}`);
    }

    if (resolvedProps.alignItems) {
      classList.push(`row--align-items-${resolvedProps.alignItems}`);
    }

    if (resolvedProps.gap) {
      classList.push(`g-${resolvedProps.gap}`);
    }

    if (resolvedProps.gapX) {
      classList.push(`gx-${resolvedProps.gapX}`);
    }

    if (resolvedProps.gapY) {
      classList.push(`gy-${resolvedProps.gapY}`);
    }

    if (resolvedProps.class) {
      classList.push(resolvedProps.class);
    }

    return classList.join(" ");
  });
}
