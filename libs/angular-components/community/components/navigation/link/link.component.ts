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
  IconComponent,
} from "@tehik-ee/tedi-angular/tedi";

export type LinkVariant = "default" | "inverted";
export type LinkSize = "default" | "small";
export type LinkInputs = {
  /**
   * Variant of the link.
   * @default default
   */
  variant: LinkVariant;
  /**
   * Size of the link.
   * @default default
   */
  size: LinkSize;
  /**
   * Does link have underline?
   * @default true
   */
  underline: boolean;
  /**
   * Name of the icon we want to show on the left.
   */
  iconLeft?: string;
  /**
   * Name of the icon we want to show on the right.
   */
  iconRight?: string;
};

@Component({
  selector: "a[tedi-link]",
  standalone: true,
  templateUrl: "./link.component.html",
  styleUrl: "./link.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "[attr.tabIndex]": "0",
  },
})
export class LinkComponent implements BreakpointInputs<LinkInputs> {
  variant = input<LinkVariant>("default");
  size = input<LinkSize>("default");
  underline = input<boolean>(true);
  iconLeft = input<string>();
  iconRight = input<string>();

  xs = input<LinkInputs>();
  sm = input<LinkInputs>();
  md = input<LinkInputs>();
  lg = input<LinkInputs>();
  xl = input<LinkInputs>();
  xxl = input<LinkInputs>();

  breakpointService = inject(BreakpointService);
  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<LinkInputs>({
      variant: this.variant(),
      size: this.size(),
      underline: this.underline(),
      iconLeft: this.iconLeft(),
      iconRight: this.iconRight(),

      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });

  classes = computed(() => {
    const classList = ["tedi-link"];

    if (this.breakpointInputs().variant === "inverted") {
      classList.push("tedi-link--inverted");
    }

    return classList.join(" ");
  });
}
