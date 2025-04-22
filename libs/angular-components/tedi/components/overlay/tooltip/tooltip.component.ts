import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
  ViewEncapsulation, AfterViewInit, OnDestroy,
} from "@angular/core";
import {
  ConnectedPosition,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { CdkPortal, PortalModule } from "@angular/cdk/portal";

export const POSITION_MAP: Record<string, ConnectedPosition> = {
  top: {
    originX: "center",
    originY: "top",
    overlayX: "center",
    overlayY: "bottom",
    panelClass: "tooltip__arrow--top",
    offsetY: -15,
  },
  bottom: {
    originX: "center",
    originY: "bottom",
    overlayX: "center",
    overlayY: "top",
    panelClass: "tooltip__arrow--bottom",
    offsetY: 15,
  },
  left: {
    originX: "end",
    originY: "center",
    overlayX: "start",
    overlayY: "center",
    panelClass: "tooltip__arrow--left",
    offsetX: 15,
  },
  right: {
    originX: "start",
    originY: "center",
    overlayX: "end",
    overlayY: "center",
    panelClass: "tooltip__arrow--right",
    offsetX: -15,
  },
};

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
   * @default 'top, bottom, left, right'
   */
  positions = input<string>("top, bottom, left, right");
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

  @ContentChild("tooltipTrigger", { static: true }) triggerButton!: ElementRef;
  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;
  private eventListeners: (() => void)[] = [];
  overlayRef!: OverlayRef;
  overlay = inject(Overlay);
  renderer = inject(Renderer2);

  ngAfterViewInit(): void {
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
    return this.positions()
      .split(",")
      .map((pos) => pos.trim())
      .map((pos) => POSITION_MAP[pos])
      .filter(Boolean);
  }

  overlayConfig(): OverlayConfig {
    const positions = this.buildPositions();
    return {
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
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
