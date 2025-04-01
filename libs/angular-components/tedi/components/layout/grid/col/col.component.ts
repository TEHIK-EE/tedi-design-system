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

export type ColWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type JustifySelf = "start" | "end" | "center" | "stretch";
export type AlignSelf = "start" | "end" | "center" | "stretch";

type ColProps = {
  /**
   * Additional class.
   */
  class: string;
  /**
   * Number of column width.
   * @default 1
   */
  width: ColWidth;
  /**
   * Aligns an item horizontally inside its own grid cell.
   */
  justifySelf?: JustifySelf;
  /**
   * Aligns an item vertically inside its own grid cell.
   */
  alignSelf?: AlignSelf;
};

@Component({
  selector: "tedi-col",
  standalone: true,
  templateUrl: "./col.component.html",
  styleUrl: "./col.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColComponent implements BreakpointProps<ColProps> {
  class = input<string>("");
  width = input<ColWidth>(1);
  justifySelf = input<JustifySelf>();
  alignSelf = input<AlignSelf>();

  xs = input<ColProps>();
  sm = input<ColProps>();
  md = input<ColProps>();
  lg = input<ColProps>();
  xl = input<ColProps>();
  xxl = input<ColProps>();

  constructor(private breakpointService: BreakpointService) {}

  classes = computed(() => {
    const resolvedProps = this.breakpointService.getBreakpointProps<ColProps>({
      class: this.class(),
      width: this.width(),
      justifySelf: this.justifySelf(),
      alignSelf: this.alignSelf(),
      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });

    const classList = ["col", `col--width-${resolvedProps.width}`];

    if (resolvedProps.justifySelf) {
      classList.push(`col--justify-self-${resolvedProps.justifySelf}`);
    }

    if (resolvedProps.alignSelf) {
      classList.push(`col--align-self-${resolvedProps.alignSelf}`);
    }

    if (resolvedProps.class) {
      classList.push(resolvedProps.class);
    }

    return classList.join(" ");
  });
}
