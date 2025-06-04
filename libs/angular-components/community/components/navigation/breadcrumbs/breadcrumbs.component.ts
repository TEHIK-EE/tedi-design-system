import { Component, computed, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import {
  IconComponent,
  TextComponent,
  BreakpointService,
  BreakpointInputs,
  LinkComponent
} from "@tehik-ee/tedi-angular/tedi";

export type Breadcrumb = {
  label: string;
  href: string;
};

export type Breadcrumbs = {
  /**
   * Breadcrumbs to be displayed.
   * @example
   * ```typescript
   * crumbs = [
   *   { label: 'Kodu', href: '/' },
   *   { label: 'Tooted', href: '/products' },
   *   { label: 'Elektroonika', href: '/products/electronics' },
   *   { label: 'Mobiiltelefonid', href: '/products/electronics/mobile-phones' },
   *   { label: 'Nutitelefonid', href: '/products/electronics/mobile-phones/smartphones' },
   * ];
   * ```
   * @description
   * The breadcrumbs to be displayed. Each breadcrumb should have a label and a href.
   * The label is the text that will be displayed, and the href is the URL that the breadcrumb will link to.
   * The breadcrumbs will be displayed in the order they are provided.
   * The last breadcrumb will not be a link, but will be displayed as plain text.
   */
  crumbs: Breadcrumb[];
  /**
   * Displays second last crumb as a link. Mainly used for mobile/tablet views.
   * @default false
   */
  shortCrumbs: boolean;
};

@Component({
  selector: "tedi-breadcrumbs",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LinkComponent,
    IconComponent,
    TextComponent,
  ],
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"],
})
export class BreadcrumbsComponent implements BreakpointInputs<Breadcrumbs> {
  crumbs = input<Breadcrumb[]>([]);
  shortCrumbs = input<boolean>(false);
  xs = input<Breadcrumbs>();
  sm = input<Breadcrumbs>();
  md = input<Breadcrumbs>();
  lg = input<Breadcrumbs>();
  xl = input<Breadcrumbs>();
  xxl = input<Breadcrumbs>();

  breakpointService = inject(BreakpointService);
  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<Breadcrumbs>({
      crumbs: this.crumbs(),
      shortCrumbs: this.shortCrumbs(),
      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });

  getSecondLastCrumb(): Breadcrumb | null {
    const crumbs = this.breakpointInputs().crumbs;
    if (crumbs.length > 1) {
      return crumbs[crumbs.length - 2];
    }
    return null;
  }
}
