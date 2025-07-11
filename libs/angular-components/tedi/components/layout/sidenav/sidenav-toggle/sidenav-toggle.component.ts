import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "../../../base/icon/icon.component";
import { SideNavService } from "../../../../services/sidenav/sidenav.service";
import { TediTranslationService } from "../../../../services/translation/translation.service";

@Component({
  selector: "button[tedi-sidenav-toggle]",
  standalone: true,
  templateUrl: "./sidenav-toggle.component.html",
  styleUrl: "./sidenav-toggle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent],
  host: {
    class: "tedi-sidenav-toggle",
    "[attr.aria-label]": "ariaLabel()",
  },
})
export class SideNavToggleComponent {
  sidenavService = inject(SideNavService);
  translationService = inject(TediTranslationService);

  @HostListener("click")
  onClick() {
    this.sidenavService.isMobileOpen.update((prev) => !prev);
    this.sidenavService.handleGoToMainMenu();
  }

  ariaLabel = this.translationService.track("sidenav.toggle");
}
