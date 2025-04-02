import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  BreakpointInputs,
  BreakpointService,
} from "../../../services/breakpoint/breakpoint.service";
import { IconComponent } from "../../base/icon/icon.component";
import { NgIf } from "@angular/common";
import { RouterLink, UrlTree } from "@angular/router";

export type LinkVariant = "default" | "inverted";
export type LinkSize = "default" | "small";

type LinkInputs = {
  /**
   * External link path.
   */
  href?: string;
  /**
   * Router link path.
   */
  routerLink?: string | any[] | UrlTree;
  /**
   * Color variant of the link.
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
   * Additional class.
   */
  class: string;
  /**
   * Element id.
   */
  id?: string;
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
  selector: "tedi-link",
  standalone: true,
  templateUrl: "./link.component.html",
  styleUrl: "./link.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent, RouterLink],
})
export class LinkComponent implements BreakpointInputs<LinkInputs> {
  href = input<string>();
  routerLink = input<string | any[] | UrlTree>();
  variant = input<LinkVariant>("default");
  size = input<LinkSize>("default");
  underline = input<boolean>(true);
  class = input<string>("");
  id = input<string>();
  iconLeft = input<string>();
  iconRight = input<string>();

  xs = input<LinkInputs>();
  sm = input<LinkInputs>();
  md = input<LinkInputs>();
  lg = input<LinkInputs>();
  xl = input<LinkInputs>();
  xxl = input<LinkInputs>();

  constructor(private breakpointService: BreakpointService) {}

  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<LinkInputs>({
      href: this.href(),
      routerLink: this.routerLink(),
      variant: this.variant(),
      size: this.size(),
      underline: this.underline(),
      class: this.class(),
      id: this.id(),
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

    if (this.breakpointInputs().class) {
      classList.push(this.breakpointInputs().class);
    }

    return classList.join(" ");
  });
}
