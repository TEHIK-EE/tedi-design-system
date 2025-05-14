import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { LinkComponent } from "../link/link.component"; //@tehik-ee/tedi-angular/community
import { RouterLink } from "@angular/router";
import {
  IconComponent,
  TextComponent,
  BreakpointService,
  type Breakpoint,
} from "@tehik-ee/tedi-angular/tedi";

export type Breadcrumb = {
  label: string;
  href: string;
};

const sampleCrumbs: Breadcrumb[] = [
  { label: "Kodu", href: "/" },
  { label: "Tooted", href: "/products" },
  { label: "Elektroonika", href: "/products/electronics" },
  { label: "Mobiiltelefonid", href: "/products/electronics/mobile-phones" },
  {
    label: "Nutitelefonid",
    href: "/products/electronics/mobile-phones/smartphones",
  },
];

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
export class BreadcrumbsComponent {
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
  crumbs = input<Breadcrumb[]>(sampleCrumbs);
  /**
   * Used to override the breakCrumbs value to force always show singleCrumb.
   * @default false
   */
  shortCrumbs = input<boolean>(false);
  /**
   * Breakpoint to be used for displaying single crumb.
   * @default md
   */
  breakCrumbs = input<Breakpoint>("md");

  singleCrumb = signal<boolean>(false);

  breakpointService = inject(BreakpointService);

  constructor() {
    effect(() => {
      const breakPoint = this.breakpointService.isBelowBreakpoint(
        this.breakCrumbs(),
      );
      this.singleCrumb.set(breakPoint);
    });
  }

  showSingleCrumb = computed(() => {
    return this.shortCrumbs() || this.singleCrumb();
  });

  getSecondLastCrumb(): Breadcrumb | null {
    if (this.crumbs().length > 1) {
      return this.crumbs()[this.crumbs().length - 2];
    }
    return null;
  }
}
