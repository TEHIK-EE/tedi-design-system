import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '../../../base/icon/icon.component';
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";

@Component({
  selector: 'button[tedi-header-logout]',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header-logout.component.html',
  styleUrl: './header-logout.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()"
  }
})
export class HeaderLogoutComponent {
  breakpointService = inject(BreakpointService);
  isMobile = this.breakpointService.isBelowBreakpoint("sm");

  classes = computed(() => {
    const classList = ["tedi-header-logout", "tedi-link"];

    if (this.isMobile()) {
      classList.push("tedi-header-logout--mobile");
    }

    return classList.join(" ");
  })
}
