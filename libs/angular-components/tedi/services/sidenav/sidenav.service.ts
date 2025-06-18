import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { BreakpointService } from "../breakpoint/breakpoint.service";
import { SideNavItemComponent } from "../../components/layout/sidenav/sidenav-item/sidenav-item.component";

@Injectable({ providedIn: "root" })
export class SideNavService {
  breakpointService = inject(BreakpointService);

  items = signal<SideNavItemComponent[]>([]);
  isMobile = this.breakpointService.isBelowBreakpoint("lg");
  isMobileOpen = signal(false);
  isCollapsed = signal(false);

  constructor() {
    effect(() => {
      if (this.isMobile() && this.isCollapsed()) {
        this.isCollapsed.set(false);
      }
    });
  }

  registerItem(item: SideNavItemComponent) {
    this.items.update((list) => [...list, item]);
  }

  unregisterItem(item: SideNavItemComponent) {
    this.items.update((list) => list.filter((i) => i !== item));
  }

  handleGoToMainMenu() {
    this.items().forEach((item) => item.dropdown?.open.set(false));
  }

  handleCollapse() {
    this.isCollapsed.update((prev) => !prev);
  }

  isMobileItemOpen = computed(() => {
    return (
      this.isMobile() && this.items().some((item) => item.dropdown?.open())
    );
  });
}
