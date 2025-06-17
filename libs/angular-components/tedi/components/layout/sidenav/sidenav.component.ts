import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";

import { IconComponent } from "../../base/icon/icon.component";
import { TediTranslationPipe } from "../../../services/translation/translation.pipe";
import { BreakpointService } from "../../../services/breakpoint/breakpoint.service";
import { SideNavItemComponent } from "./sidenav-item/sidenav-item.component";

export type SideNavItemSize = "small" | "medium" | "large";

@Component({
  selector: "nav[tedi-sidenav]",
  standalone: true,
  templateUrl: "./sidenav.component.html",
  styleUrl: "./sidenav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent, TediTranslationPipe],
  host: {
    "[class]": "classes()",
  },
})
export class SideNavComponent {
  /**
   * Show dividers between items
   * @default true
   */
  dividers = input<boolean>(true);
  /**
   * Size of navigation item
   * @default large
   */
  size = input<SideNavItemSize>("large");
  /**
   * Is navigation collapsible in desktop?
   * @default false
   */
  collapsible = input<boolean>(true);

  breakpointService = inject(BreakpointService);
  isCollapsed = signal(false);
  isMobile = this.breakpointService.isBelowBreakpoint("lg");
  sidenavItems = contentChildren(SideNavItemComponent);

  constructor() {
    effect(() => {
      if (this.isMobile() && this.isCollapsed()) {
        this.isCollapsed.set(false);
      }
    });
  }

  handleCollapse() {
    this.isCollapsed.update((prev) => !prev);
  }

  handleMainMenu() {
    this.sidenavItems().forEach((item) => item.dropdown?.open.set(false));
  }

  isMobileMenuOpen = computed(() => {
    return (
      this.isMobile() &&
      this.sidenavItems().some((item) => item.dropdown?.open())
    );
  });

  classes = computed(() => {
    const classList = ["tedi-sidenav", `tedi-sidenav--${this.size()}`];

    if (this.dividers()) {
      classList.push("tedi-sidenav--dividers");
    }

    if (this.isCollapsed()) {
      classList.push("tedi-sidenav--collapsed");
    }

    if (this.isMobile()) {
      classList.push("tedi-sidenav--mobile");
    }

    if (this.isMobileMenuOpen()) {
      classList.push("tedi-sidenav--mobile-open");
    }

    return classList.join(" ");
  });
}
