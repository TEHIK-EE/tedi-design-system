import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { BreakpointService } from "@tehik-ee/tedi-angular/tedi";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "tedi-footer-body",
  template: "<ng-content />",
  styleUrl: "./footer-body.component.scss",
  host: {
    class: "tedi-footer-body",
    "[class.tedi-footer-body--mobile]": "this.mobileLayout()",
  },
})
export class FooterBodyComponent {
  breakpointService = inject(BreakpointService);

  mobileLayout = computed(() => {
    return this.breakpointService.isBelowBreakpoint("sm");
  });
}
