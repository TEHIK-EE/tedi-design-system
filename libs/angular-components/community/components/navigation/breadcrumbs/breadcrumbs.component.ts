import { Component, inject, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LinkComponent } from "../link/link.component"; //@tehik-ee/tedi-angular/community
// import { RouterLink } from "@angular/router";
import {
  IconComponent,
  TextComponent,
  BreakpointService,
} from "@tehik-ee/tedi-angular/tedi";

export type Breadcrumb = {
  label: string;
  href: string;
};

export type Breakpoint = ["mobile", "tablet", "desktop"];

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
    // RouterLink,
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
   * Whether to display single crumb or not. It is mostly used for mobile view which will display only the last crumb.
   * @default false
   */
  shortCrumbs = input<boolean>(false);
  /**
   * Whether to display the breadcrumbs as a single line or not.
   * @default false
   */
  singleCrumb = signal<boolean>(false);

  breakpointService = inject(BreakpointService);

  getSecondLastCrumb(): Breadcrumb | null {
    if (this.crumbs().length > 1) {
      return this.crumbs()[this.crumbs().length - 2];
    }
    return null;
  }
}
