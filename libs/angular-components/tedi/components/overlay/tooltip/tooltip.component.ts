import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import {
  ConnectedPosition,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { CdkPortal, PortalModule } from "@angular/cdk/portal";

export type TooltipTrigger = "click" | "hover";

const topStart: ConnectedPosition = {
  originX: "start",
  originY: "top",
  overlayX: "start",
  overlayY: "bottom",
};

const bottomStart: ConnectedPosition = {
  originX: "start",
  originY: "bottom",
  overlayX: "start",
  overlayY: "top",
};

const leftStart: ConnectedPosition = {
  originX: "start",
  originY: "top",
  overlayX: "end",
  overlayY: "top",
};

const rightStart: ConnectedPosition = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
};

const topCenter: ConnectedPosition = {
  originX: "center",
  originY: "top",
  overlayX: "center",
  overlayY: "bottom",
};

const bottomCenter: ConnectedPosition = {
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
};

const leftCenter: ConnectedPosition = {
  originX: "end",
  originY: "center",
  overlayX: "start",
  overlayY: "center",
};

const rightCenter: ConnectedPosition = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
};

const topEnd: ConnectedPosition = {
  originX: "end",
  originY: "top",
  overlayX: "end",
  overlayY: "bottom",
};

const bottomEnd: ConnectedPosition = {
  originX: "end",
  originY: "bottom",
  overlayX: "end",
  overlayY: "top",
};

const leftEnd: ConnectedPosition = {
  originX: "start",
  originY: "bottom",
  overlayX: "end",
  overlayY: "bottom",
};

const rightEnd: ConnectedPosition = {
  originX: "end",
  originY: "bottom",
  overlayX: "start",
  overlayY: "bottom",
};

/**
 * TooltipComponent is a component that displays a Tooltip when the user hovers over or clicks on an element.
 * It uses the Angular CDK Overlay module to create a flexible connected overlay that can be positioned relative to the trigger element.
 * The Tooltip can be configured to open on hover or click, and can be positioned at the top, bottom, left, or right of the trigger element.
 *
 * Angular CDK Overlay: How positioning works:
 * https://www.youtube.com/watch?v=IpRQBtBN3iU&ab_channel=BrianTreese
 *
 * Angular CDK Overlay: Adding accessibility features
 * https://www.youtube.com/watch?v=_0JGZATel-8&ab_channel=BrianTreese
 *
 * Angular tooltip with arrow
 * https://stackblitz.com/edit/angular-tooltip-with-arrow?file=src%2Fapp%2Fapp.module.ts,src%2Fapp%2Ftooltip%2Ftooltip.component.html
 *
 * Arrow location determination
 * https://stackoverflow.com/questions/70279084/determine-direction-of-angular-material-tooltip-to-apply-arrow
 *
 */

@Component({
  standalone: true,
  selector: "tedi-tooltip",
  imports: [OverlayModule, PortalModule],
  templateUrl: "./tooltip.component.html",
  styleUrl: "./tooltip.component.scss",
})
export class TooltipComponent {
  text = input<string>();
  @ContentChild("trigger", { static: true }) triggerButton!: ElementRef;
  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  overlayRef!: OverlayRef;
  overlay = inject(Overlay);
  renderer = inject(Renderer2);

  ngAfterViewInit() {
    this.openTooltip();
    this.renderer.listen(this.triggerButton.nativeElement, "mouseenter", () => {
      this.openTooltip();
    });
    this.renderer.listen(this.triggerButton.nativeElement, "mouseleave", () => {
      this.closeTooltip();
    });
  }

  overlayConfig(): OverlayConfig {
    return {
      hasBackdrop: false,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.triggerButton)
        .withPositions([topCenter, bottomCenter, rightCenter, leftCenter]),
    };
  }

  openTooltip() {
    this.overlayRef = this.overlay.create(this.overlayConfig());
    this.overlayRef.attach(this.portal);
  }

  closeTooltip() {
    this.overlayRef.detach();
  }
}
