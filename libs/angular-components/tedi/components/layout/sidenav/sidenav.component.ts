import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  effect,
  input,
  QueryList,
  signal,
  ViewEncapsulation,
} from "@angular/core";

import { IconComponent } from "../../base/icon/icon.component";
import { SideNavItemComponent } from "./sidenav-item/sidenav-item.component";

export type SideNavItemSize = "small" | "medium" | "large";

@Component({
  selector: "tedi-sidenav",
  standalone: true,
  templateUrl: "./sidenav.component.html",
  styleUrl: "./sidenav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent],
  host: {
    "[class]": "classes()",
  },
})
export class SideNavComponent implements AfterContentInit {
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

  @ContentChildren(SideNavItemComponent)
  items?: QueryList<SideNavItemComponent>;

  isCollapsed = signal(false);
  navItems = signal<SideNavItemComponent[]>([]);

  ngAfterContentInit(): void {
    if (this.items) {
      this.navItems.set(Array.from(this.items));
    }
  }

  constructor() {
    effect(() => {
      this.navItems().forEach((item) => {
        item.isCollapsed.set(this.isCollapsed());
        item.size.set(this.size());
      });
    });
  }

  handleCollapse() {
    this.isCollapsed.update((prev) => !prev);
  }

  classes = computed(() => {
    const classList = ["tedi-sidenav", `tedi-sidenav--${this.size()}`];

    if (this.dividers()) {
      classList.push("tedi-sidenav--dividers");
    }

    if (this.isCollapsed()) {
      classList.push("tedi-sidenav--collapsible");
    }

    return classList.join(" ");
  });
}
