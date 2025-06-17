import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

import { TextComponent } from "../../../../components/base/text/text.component";
import { IconComponent } from "../../../../components/base/icon/icon.component";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "tedi-footer-links",
  imports: [IconComponent, TextComponent],
  templateUrl: "./footer-links.component.html",
  styleUrl: "./footer-links.component.scss",
  host: {
    class: "tedi-footer-links",
    "[class.tedi-footer-links--collapse]": "applyCollapse()",
  },
  animations: [
    trigger("collapseContent", [
      state(
        "collapsed",
        style({
          height: "0",
          opacity: 0,
          visibility: "hidden",
        }),
      ),
      state(
        "expanded",
        style({
          height: "*",
          opacity: 1,
          visibility: "visible",
        }),
      ),
      transition("collapsed <=> expanded", [animate("300ms ease")]),
    ]),
  ],
})
export class FooterLinksComponent {
  /**
   * Specifies the icon to be displayed in the footer links.
   */
  icon = input<string>();
  /**
   * Specifies the heading text for the footer links.
   */
  heading = input<string>();
  /**
   * Enables the collapse functionality for the footer links.
   * When set to true, the footer links will be collapsible on mobile devices.
   * @default "false"
   */
  collapse = input<boolean>(false);

  applyCollapse = computed(() => {
    return this.collapse() && this.mobileLayout();
  });

  collapseOpen = signal<boolean>(false);
  breakpointService = inject(BreakpointService);

  hideIcon = computed(() => {
    return !this.breakpointService.isBelowBreakpoint("lg");
  });

  mobileLayout = computed(() => {
    return this.breakpointService.isBelowBreakpoint("sm");
  });

  toggleCollapse() {
    if (this.collapse()) {
      this.collapseOpen.update((value) => !value);
    }
  }
}
