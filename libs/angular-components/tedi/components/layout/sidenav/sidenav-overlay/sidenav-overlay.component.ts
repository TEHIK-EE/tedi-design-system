import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { SideNavService } from "../../../../services/sidenav/sidenav.service";

@Component({
  selector: "tedi-sidenav-overlay",
  standalone: true,
  styleUrl: "./sidenav-overlay.component.scss",
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class SideNavOverlayComponent {
  sidenavService = inject(SideNavService);

  @HostListener("click")
  onClick() {
    this.sidenavService.isMobileOpen.set(false);
    this.sidenavService.handleGoToMainMenu();
  }

  classes = computed(() => {
    const classList = ["tedi-sidenav-overlay"];

    if (this.sidenavService.isMobile() && this.sidenavService.isMobileOpen()) {
      classList.push("tedi-sidenav-overlay--visible");
    }

    return classList.join(" ");
  });
}
