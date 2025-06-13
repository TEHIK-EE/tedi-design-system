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
import {
  BreakpointService,
  IconComponent,
  TextComponent,
} from "@tehik-ee/tedi-angular/tedi";

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
          overflow: "hidden",
          visibility: "hidden",
          display: "none",
        }),
      ),
      state(
        "expanded",
        style({
          height: "*",
          opacity: 1,
          overflow: "visible",
          visibility: "visible",
        }),
      ),
      transition("collapsed <=> expanded", [animate("300ms ease")]),
    ]),
  ],
})
export class FooterLinksComponent {
  icon = input<string>("");
  heading = input<string>("");
  collapse = input<boolean>(false);

  applyCollapse = computed(() => {
    return this.collapse() === true && this.mobileLayout();
  });

  collapseOpen = signal<boolean>(false);
  breakpointService = inject(BreakpointService);

  hideIcon = computed(() => {
    const isBelowBreakpoint = this.breakpointService.isBelowBreakpoint("lg");
    return !isBelowBreakpoint;
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
