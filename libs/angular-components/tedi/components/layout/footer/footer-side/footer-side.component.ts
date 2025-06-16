import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
  HostBinding,
} from "@angular/core";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";

export type FooterSidePosition = "top" | "center" | "bottom";
export type FooterSidePlacement = "start" | "end";

@Component({
  standalone: true,
  selector: "tedi-footer-side",
  template: `<ng-content />`,
  styleUrl: "./footer-side.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FooterSideComponent {
  position = input<FooterSidePosition>("center");
  placement = signal<FooterSidePlacement | null>(null);
  breakpointService = inject(BreakpointService);

  mobileLayout = computed(() => {
    return this.breakpointService.isBelowBreakpoint("sm");
  });

  constructor(
    @Attribute("tedi-footer-start") public isStart: string,
    @Attribute("tedi-footer-end") public isEnd: string,
  ) {
    const side =
      this.isStart !== null ? "start" : this.isEnd !== null ? "end" : null;
    if (side) this.placement.set(side as FooterSidePlacement);
    else
      console.warn(
        '[TediFooterSide] No placement detected. Use "tedi-footer-start" or "tedi-footer-end" attribute to define where this component should be rendered.',
      );
  }

  @HostBinding("class")
  get hostClasses(): string {
    const classes = ["tedi-footer-side"];

    if (this.mobileLayout()) classes.push("tedi-footer-side--mobile");

    classes.push(`tedi-footer-side--${this.placement()}`);
    classes.push(`tedi-footer-side--${this.position()}`);

    return classes.join(" ");
  }
}
