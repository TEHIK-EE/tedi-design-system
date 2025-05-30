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
import { IconComponent } from "../../base/icon/icon.component";

export type ClosingButtonSize = "medium" | "large";
export type ClosingButton = {
  /**
   * Determins if the button should be medium or large.
   * @default false
   */
  size: ClosingButtonSize;
  /**
   * The title for the button.
   * Used for accessibility and inside browsers default tooltip on hover.
   * If not provided, the 'close' label will be used as a fallback.
   * @default Sulge
   */
  title: string;
};
@Component({
  selector: "[tedi-closing-button]",
  imports: [IconComponent],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./closing-button.component.html",
  styleUrl: "./closing-button.component.scss",
  host: {
    type: "button",
    "[title]": "title()",
    "[attr.aria-label]": "title()",
    "[class.tedi-closing-button]": "true",
    "[class.tedi-closing-button--small]": "size() === 'medium'",
  },
})
export class ClosingButtonComponent implements BreakpointInputs<ClosingButton> {
  size = input<ClosingButtonSize>("medium");
  title = input<string>("Sulge");

  breakpointService = inject(BreakpointService);

  xs = input<ClosingButton>();
  sm = input<ClosingButton>();
  md = input<ClosingButton>();
  lg = input<ClosingButton>();
  xl = input<ClosingButton>();
  xxl = input<ClosingButton>();

  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<ClosingButton>({
      size: this.size(),
      title: this.title(),

      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });
}
