import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { IconComponent, ButtonComponent, TediTranslationService, BreakpointService } from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: 'tedi-header-login',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './header-login.component.html',
  styleUrl: './header-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLoginComponent {
  breakpointService = inject(BreakpointService);
  translationService = inject(TediTranslationService);

  isMobile = this.breakpointService.isBelowBreakpoint("sm");
  textDesktop = this.translationService.track("header.login");
  textMobile = this.translationService.track("header.login-mobile");

  text = computed(() => this.isMobile() ? this.textMobile() : this.textDesktop());
}
