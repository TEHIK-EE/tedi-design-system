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

export type ColWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type JustifySelf = "start" | "end" | "center" | "stretch";
export type AlignSelf = "start" | "end" | "center" | "stretch";
export type ColInputs = {
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
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "role": "presentation",
  }
})
export class ColComponent implements BreakpointInputs<ColInputs> {
  width = input<ColWidth>(1);
  justifySelf = input<JustifySelf>();
  alignSelf = input<AlignSelf>();

  xs = input<ColInputs>();
  sm = input<ColInputs>();
  md = input<ColInputs>();
  lg = input<ColInputs>();
  xl = input<ColInputs>();
  xxl = input<ColInputs>();

  breakpointService = inject(BreakpointService);
  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<ColInputs>({
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
  });

  classes = computed(() => {
    const classList = ["col", `col--width-${this.breakpointInputs().width}`];

    if (this.breakpointInputs().justifySelf) {
      classList.push(
        `col--justify-self-${this.breakpointInputs().justifySelf}`,
      );
    }

    if (this.breakpointInputs().alignSelf) {
      classList.push(`col--align-self-${this.breakpointInputs().alignSelf}`);
    }

    return classList.join(" ");
  });
}
