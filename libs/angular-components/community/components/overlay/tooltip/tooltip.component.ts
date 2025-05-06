import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import {
  ConnectedPosition,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { CdkPortal, PortalModule } from "@angular/cdk/portal";

const arrowOffset = 15;

const positionTop: ConnectedPosition = {
  originX: "center",
  originY: "top",
  overlayX: "center",
  overlayY: "bottom",
  panelClass: "tooltip__arrow--top",
  offsetY: -arrowOffset,
};

const positionBottom: ConnectedPosition = {
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
  panelClass: "tooltip__arrow--bottom",
  offsetY: arrowOffset,
};

const positionRight: ConnectedPosition = {
  originX: "end",
  originY: "center",
  overlayX: "start",
  overlayY: "center",
  panelClass: "tooltip__arrow--left",
  offsetX: arrowOffset,
};

const positionLeft: ConnectedPosition = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
  panelClass: "tooltip__arrow--right",
  offsetX: -arrowOffset,
};

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipWidth = "none" | "small" | "medium" | "large";
export type TooltipTrigger = "click" | "hover";

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
 */

@Component({
  standalone: true,
  selector: "tedi-tooltip",
  imports: [OverlayModule, PortalModule],
  templateUrl: "./tooltip.component.html",
  styleUrl: "./tooltip.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  /**
   * The text to be displayed in the tooltip.
   */
  text = input.required<string>();
  /**
   * The position of the tooltip relative to the trigger element. If tooltip can't
   * be positioned in the specified direction, the CDK will try to position the tooltip
   * in the next direction in positions list.
   * @default 'top'
   */
  position = input<TooltipPosition>("top");
  /**
   * The trigger event that opens the tooltip. Can be 'click' or 'hover'.
   * @default 'hover'
   */
  openWith = input<TooltipTrigger>("hover");
  /**
   * The width of the tooltip. Can be 'none', 'small', 'medium', or 'large'.
   * @default 'medium'
   */
  maxWidth = input<TooltipWidth>("medium");

  @ContentChild("tooltipTrigger", { read: ElementRef })
  triggerButton!: ElementRef;
  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;
  private eventListeners: (() => void)[] = [];
  overlayRef!: OverlayRef;
  overlay = inject(Overlay);
  renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    if (!this.triggerButton?.nativeElement) {
      console.warn("tooltipTrigger not found, tooltip will not work");
      return;
    }
    this.focusEvents();
    if (this.openWith() === "click") {
      this.clickEvents();
    } else {
      this.hoverEvents();
    }
  }

  ngOnDestroy(): void {
    this.eventListeners.forEach((event) => event());
    this.eventListeners = [];
  }

  hoverEvents(): void {
    this.eventListeners.push(
      this.renderer.listen(
        this.triggerButton.nativeElement,
        "mouseenter",
        () => {
          this.openTooltip();
        },
      ),
    );
    this.eventListeners.push(
      this.renderer.listen(
        this.triggerButton.nativeElement,
        "mouseleave",
        () => {
          this.closeTooltip();
        },
      ),
    );
  }

  clickEvents(): void {
    this.eventListeners.push(
      this.renderer.listen(this.triggerButton.nativeElement, "click", () => {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
          this.closeTooltip();
        } else {
          this.openTooltip();
        }
      }),
    );
  }

  focusEvents(): void {
    this.eventListeners.push(
      this.renderer.listen(
        this.triggerButton.nativeElement,
        "focus",
        (event: FocusEvent) => {
          if (event.relatedTarget) {
            this.openTooltip();
          }
        },
      ),
    );
    this.eventListeners.push(
      this.renderer.listen(this.triggerButton.nativeElement, "blur", () => {
        this.closeTooltip();
      }),
    );
  }

  buildPositions(): ConnectedPosition[] {
    const positionMap = {
      top: [positionTop, positionBottom, positionLeft, positionRight],
      bottom: [positionBottom, positionTop, positionLeft, positionRight],
      left: [positionLeft, positionRight, positionTop, positionBottom],
      right: [positionRight, positionLeft, positionTop, positionBottom],
    };

    const currentPosition = this.position();
    return positionMap[currentPosition] || [];
  }

  overlayConfig(): OverlayConfig {
    const positions = this.buildPositions();
    return {
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.triggerButton)
        .withPositions(positions),
    };
  }

  openTooltip(): void {
    this.overlayRef = this.overlay.create(this.overlayConfig());
    this.overlayRef.attach(this.portal);
  }

  closeTooltip(): void {
    this.overlayRef.detach();
  }
}
