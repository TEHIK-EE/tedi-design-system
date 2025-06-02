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

export type ClosingButtonSize = "default" | "small";
export type ClosingButtonIconSize = 18 | 24;
export type ClosingButton = {
  /**
   * Overall button size.
   * - `default` - The default size, typically larger.
   * - `small` - A smaller version of the button, often used in compact layouts.
   * @default default
   */
  size: ClosingButtonSize;
  /**
   * The size of the icon inside the button in pixels.
   * - `24` - A standard icon size, commonly used in most interfaces.
   * - `18` - A smaller icon size, suitable for compact designs.
   * @default 24
   */
  iconSize: ClosingButtonIconSize;
  /**
   * The title for the button.
   * Used for accessibility and inside browsers default tooltip.
   * If not provided, the 'Sulge' label will be used as a fallback.
   * @default Sulge
   */
  title: string;
};
@Component({
  selector: "button[tedi-closing-button]",
  imports: [IconComponent],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./closing-button.component.html",
  styleUrl: "./closing-button.component.scss",
  host: {
    "[title]": "this.breakpointInputs().title",
    "[attr.aria-label]": "this.breakpointInputs().title",
    "[class.tedi-closing-button]": "true",
    "[class.tedi-closing-button--small]":
      "this.breakpointInputs().size === 'small'",
  },
})
export class ClosingButtonComponent implements BreakpointInputs<ClosingButton> {
  size = input<ClosingButtonSize>("default");
  iconSize = input<ClosingButtonIconSize>(24);
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
      iconSize: this.iconSize(),

      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });
}
