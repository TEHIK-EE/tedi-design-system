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
  signal,
} from "@angular/core";
import {
  ConnectedPosition,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { CdkPortal, PortalModule } from "@angular/cdk/portal";

export const TOOLTIP_ARROW_OFFSET = 15;
export const TOOLTIP_TIMEOUT_MS = 150;

const positionTop: ConnectedPosition = {
  originX: "center",
  originY: "top",
  overlayX: "center",
  overlayY: "bottom",
  panelClass: "tooltip__arrow--top",
  offsetY: -TOOLTIP_ARROW_OFFSET,
};

const positionBottom: ConnectedPosition = {
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
  panelClass: "tooltip__arrow--bottom",
  offsetY: TOOLTIP_ARROW_OFFSET,
};

const positionRight: ConnectedPosition = {
  originX: "end",
  originY: "center",
  overlayX: "start",
  overlayY: "center",
  panelClass: "tooltip__arrow--left",
  offsetX: TOOLTIP_ARROW_OFFSET,
};

const positionLeft: ConnectedPosition = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
  panelClass: "tooltip__arrow--right",
  offsetX: -TOOLTIP_ARROW_OFFSET,
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
   * @default top
   */
  position = input<TooltipPosition>("top");
  /**
   * The trigger event that opens the tooltip. Can be 'click' or 'hover'.
   * @default hover
   */
  openWith = input<TooltipTrigger>("hover");
  /**
   * The width of the tooltip. Can be 'none', 'small', 'medium', or 'large'.
   * @default medium
   */
  maxWidth = input<TooltipWidth>("medium");

  @ContentChild("tooltipTrigger", { read: ElementRef })
  triggerButton!: ElementRef;

  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;
  overlayRef!: OverlayRef;
  overlay = inject(Overlay);
  private host = inject(ElementRef);
  private renderer = inject(Renderer2);
  private eventListeners: (() => void)[] = [];

  hoverTimeout = signal<ReturnType<typeof setTimeout> | null>(null);
  isTriggerHovered = signal(false);
  isTooltipHovered = signal(false);

  ngAfterViewInit(): void {
    if (!this.triggerButton?.nativeElement) {
      return;
    }

    this.focusEvents();
    this.hoverEvents();
    this.clickEvents();
  }

  ngOnDestroy(): void {
    this.eventListeners.forEach((event) => event());
    this.eventListeners = [];
  }

  hoverEvents(): void {
    const triggerEl = this.host.nativeElement;

    this.eventListeners.push(
      this.renderer.listen(triggerEl, "mouseenter", () => {
        this.isTriggerHovered.set(true);

        if (this.openWith() === "hover") {
          this.openTooltip();
        }
      })
    );

    this.eventListeners.push(
      this.renderer.listen(triggerEl, "mouseleave", () => {
        this.isTriggerHovered.set(false);

        if (this.openWith() === "hover") {
          this.scheduleCloseTooltip();
        }
      })
    );
  }

  clickEvents(): void {
    this.eventListeners.push(
      this.renderer.listen(this.triggerButton.nativeElement, "click", () => {
        if (this.openWith() === "click") {
          this.toggleTooltip();
        }
      }),
    );

    this.eventListeners.push(
      this.renderer.listen("document", "click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
  
        const clickedInsideTrigger = this.triggerButton.nativeElement.contains(target);
        const tooltipEl = this.overlayRef?.overlayElement;
        const clickedInsideTooltip = tooltipEl?.contains(target);
  
        if (!clickedInsideTrigger && !clickedInsideTooltip) {
          this.closeTooltip();
        }
      })
    );
  }

  focusEvents(): void {
    this.eventListeners.push(
      this.renderer.listen(this.triggerButton.nativeElement, "focus", () => {
        if (!this.isTriggerHovered()) {
          this.openTooltip();
        }
      }),
    );
    this.eventListeners.push(
      this.renderer.listen(this.triggerButton.nativeElement, "blur", () => {
        this.scheduleCloseTooltip();
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

  toggleTooltip(): void {
    if (this.overlayRef?.hasAttached()) {
      this.closeTooltip();
    } else {
      this.openTooltip();
    }
  }

  openTooltip(): void {
    this.clearCloseTimeout();
    this.overlayRef = this.overlay.create(this.overlayConfig());

    if (!this.overlayRef?.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.addTooltipHoverListeners();
    }
  }

  scheduleCloseTooltip(): void {
    this.hoverTimeout.set(
      setTimeout(() => {
        if (!this.isTriggerHovered() && !this.isTooltipHovered()) {
          this.closeTooltip();
        }
      }, TOOLTIP_TIMEOUT_MS)
    );
  }

  closeTooltip(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private clearCloseTimeout(): void {
    const timeout = this.hoverTimeout();

    if (timeout) {
      clearTimeout(timeout);
      this.hoverTimeout.set(null);
    }
  }

  private addTooltipHoverListeners(): void {
    const tooltipEl = this.overlayRef.overlayElement.querySelector(".tooltip");
    if (!tooltipEl) return;

    const enterListener = this.renderer.listen(tooltipEl, "mouseenter", () => {
      this.isTooltipHovered.set(true);
      this.clearCloseTimeout();
    });

    const leaveListener = this.renderer.listen(tooltipEl, "mouseleave", () => {
      this.isTooltipHovered.set(false);

      if (this.openWith() === "hover") {
        this.scheduleCloseTooltip();
      }
    });

    this.eventListeners.push(enterListener, leaveListener);
  }
}
