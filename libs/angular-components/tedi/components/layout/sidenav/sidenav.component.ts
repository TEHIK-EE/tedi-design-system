import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";

import { IconComponent } from "../../base/icon/icon.component";
import { TediTranslationPipe } from "../../../services/translation/translation.pipe";
import { SideNavService } from "../../../services/sidenav/sidenav.service";

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
  collapsible = input<boolean>(false);

  sidenavService = inject(SideNavService);

  classes = computed(() => {
    const classList = [`tedi-sidenav--${this.size()}`];

    if (this.dividers()) {
      classList.push("tedi-sidenav--dividers");
    }

    if (this.sidenavService.isCollapsed()) {
      classList.push("tedi-sidenav--collapsed");
    }

    if (this.sidenavService.isMobile()) {
      classList.push("tedi-sidenav--mobile");
    }

    if (this.sidenavService.isMobileItemOpen()) {
      classList.push("tedi-sidenav--mobile-item-open");
    }

    if (this.sidenavService.isMobile() && !this.sidenavService.isMobileOpen()) {
      classList.push("tedi-sidenav--hidden");
    }

    return classList.join(" ");
  });
}
