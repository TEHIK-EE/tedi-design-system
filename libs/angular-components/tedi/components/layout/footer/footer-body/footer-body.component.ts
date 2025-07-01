import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";

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

  mobileLayout = this.breakpointService.isBelowBreakpoint("sm");
}
