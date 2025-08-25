import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import {
  BreakpointInputs,
  BreakpointService,
} from "../../../services/breakpoint/breakpoint.service";

export type TextGroupType = "vertical" | "horizontal";

export type TextGroupInputs = {
  /**
   * Type of text group layout
   * @default horizontal
   */
  type: TextGroupType;
  /**
   * Width for the label (e.g., '200px', '30%', etc.)
   */
  labelWidth: string | undefined;
};
@Component({
  standalone: true,
  selector: "tedi-text-group",
  templateUrl: "./text-group.component.html",
  styleUrl: "./text-group.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextGroupComponent implements BreakpointInputs<TextGroupInputs> {
  type = input<TextGroupType>("horizontal");
  labelWidth = input<string>();
  breakpointService = inject(BreakpointService);

  xs = input<TextGroupInputs>();
  sm = input<TextGroupInputs>();
  md = input<TextGroupInputs>();
  lg = input<TextGroupInputs>();
  xl = input<TextGroupInputs>();
  xxl = input<TextGroupInputs>();

  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<TextGroupInputs>({
      type: this.type(),
      labelWidth: this.labelWidth(),

      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });

  classes = computed(() => {
    const classList = [`tedi-text-group--${this.breakpointInputs().type}`];
    return classList.join(" ");
  });
}
