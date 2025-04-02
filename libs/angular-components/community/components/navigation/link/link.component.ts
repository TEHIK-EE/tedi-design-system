import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  BreakpointInputs,
  BreakpointService,
} from "../../../../tedi/services/breakpoint/breakpoint.service";
import { IconComponent } from "../../../../tedi/components/base/icon/icon.component";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import {
  ActivatedRoute,
  Params,
  QueryParamsHandling,
  RouterLink,
  UrlTree,
} from "@angular/router";

export type LinkVariant = "default" | "inverted";
export type LinkSize = "default" | "small";

// Input types extend Angular RouterLink: https://angular.dev/api/router/RouterLink

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
   * Where to display the linked URL.
   */
  target?: string;
  /**
   * Passed to Router#createUrlTree as part of the UrlCreationOptions.
   */
  queryParams?: Params;
  /**
   * Passed to Router#createUrlTree as part of the UrlCreationOptions.
   */
  fragment?: string;
  /**
   * Passed to Router#createUrlTree as part of the UrlCreationOptions.
   */
  queryParamsHandling?: QueryParamsHandling;
  /**
   * Passed to Router#navigateByUrl as part of the NavigationBehaviorOptions.
   */
  state?: { [k: string]: any };
  /**
   * Passed to Router#navigateByUrl as part of the NavigationBehaviorOptions.
   */
  info: unknown;
  /**
   * Passed to Router#createUrlTree as part of the UrlCreationOptions.
   * Specify a value here when you do not want to use the default value for routerLink, which is the current activated route.
   * Note that a value of undefined here will use the routerLink default.
   */
  relativeTo?: ActivatedRoute;
  /**
   * Passed to Router#createUrlTree as part of the UrlCreationOptions.
   */
  preserveFragment?: boolean;
  /**
   * Passed to Router#navigateByUrl as part of the NavigationBehaviorOptions.
   */
  skipLocationChange?: boolean;
  /**
   * Passed to Router#navigateByUrl as part of the NavigationBehaviorOptions.
   */
  replaceUrl?: boolean;
  /**
   * The relationship of the linked URL as space-separated link types.
   */
  rel?: string;
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
  imports: [NgIf, NgTemplateOutlet, IconComponent, RouterLink],
})
export class LinkComponent implements BreakpointInputs<LinkInputs> {
  href = input<string>();
  routerLink = input<string | any[] | UrlTree>();
  target = input<string>();
  queryParams = input<Params>();
  fragment = input<string>();
  queryParamsHandling = input<QueryParamsHandling>();
  state = input<{ [k: string]: any }>();
  info = input<unknown>();
  relativeTo = input<ActivatedRoute>();
  preserveFragment = input<boolean>();
  skipLocationChange = input<boolean>();
  replaceUrl = input<boolean>();
  rel = input<string>();

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
      target: this.target(),
      queryParams: this.queryParams(),
      fragment: this.fragment(),
      queryParamsHandling: this.queryParamsHandling(),
      state: this.state(),
      info: this.info(),
      relativeTo: this.relativeTo(),
      preserveFragment: this.preserveFragment(),
      skipLocationChange: this.skipLocationChange(),
      replaceUrl: this.replaceUrl(),
      rel: this.rel(),

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
