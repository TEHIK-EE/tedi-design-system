import {
  Component,
  inject,
  input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  signal,
  AfterContentInit,
  ContentChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  ConnectedPosition,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
  Overlay
} from "@angular/cdk/overlay";
import { CdkPortal, PortalModule } from "@angular/cdk/portal";
import { TooltipTriggerComponent } from "./tooltip-trigger.component";
import { TooltipContentComponent } from "./tooltip-content.component";

export const TOOLTIP_ARROW_OFFSET = 15;
export const TOOLTIP_TIMEOUT_MS = 150;

const positionTop: ConnectedPosition = {
  originX: "center",
  originY: "top",
  overlayX: "center",
  overlayY: "bottom",
  panelClass: "tedi-tooltip-content__arrow--top",
  offsetY: -TOOLTIP_ARROW_OFFSET,
};

const positionBottom: ConnectedPosition = {
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
  panelClass: "tedi-tooltip-content__arrow--bottom",
  offsetY: TOOLTIP_ARROW_OFFSET,
};

const positionRight: ConnectedPosition = {
  originX: "end",
  originY: "center",
  overlayX: "start",
  overlayY: "center",
  panelClass: "tedi-tooltip-content__arrow--left",
  offsetX: TOOLTIP_ARROW_OFFSET,
};

const positionLeft: ConnectedPosition = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
  panelClass: "tedi-tooltip-content__arrow--right",
  offsetX: -TOOLTIP_ARROW_OFFSET,
};

export type TooltipOpenWith = "click" | "hover";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements AfterContentInit, OnDestroy {
  /**
   * The trigger event that opens the tooltip. Can be 'click' or 'hover'.
   * @default hover
   */
  openWith = input<TooltipOpenWith>("hover");

  @ContentChild(TooltipTriggerComponent) trigger?: TooltipTriggerComponent;
  @ContentChild(TooltipContentComponent) content?: TooltipContentComponent;
  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private overlayRef?: OverlayRef;
  private readonly overlay = inject(Overlay);
  private readonly  renderer = inject(Renderer2);
  private readonly eventListeners: (() => void)[] = [];

  closeTimeout = signal<ReturnType<typeof setTimeout> | null>(null);
  private isTriggerHovered = signal(false);
  private isTooltipHovered = signal(false);

  ngAfterContentInit(): void {
    const trigger = this.trigger?.element();

    if (!trigger) {
      return;
    }

    this.eventListeners.push(
      this.renderer.listen(trigger, "focus", () => {
        if (!this.isTriggerHovered()) {
          this.openTooltip()
        }
      }),
      this.renderer.listen(trigger, "blur", () => {
        if (!this.isTooltipHovered()) {
          this.closeTooltip();
        }
      }),
      this.renderer.listen(trigger, "mouseenter", () => {
        this.isTriggerHovered.set(true);

        if (this.openWith() === "hover") {
          this.openTooltip();
        }
      }),
      this.renderer.listen(trigger, "mouseleave", () => {
        this.isTriggerHovered.set(false);

        if (this.openWith() === "hover") {
          this.scheduleClose();
        }
      }),
      this.renderer.listen(trigger, "click", () => {
        if (this.openWith() === "click") {
          this.toggleTooltip()
        }
      }),
      this.renderer.listen("document", "click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const clickedInsideTrigger = trigger.contains(target);
        const tooltip = this.overlayRef?.overlayElement;
        const clickedInsideTooltip = tooltip?.contains(target);
  
        if (!clickedInsideTrigger && !clickedInsideTooltip) {
          this.closeTooltip();
        }
      }),
      this.renderer.listen("document", "keydown", (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          this.closeTooltip();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.eventListeners.forEach(off => off());
    this.eventListeners.length = 0;
    this.closeTooltip();
  }

  openTooltip(): void {
    this.clearCloseTimeout();

    if (!this.overlayRef || !this.overlayRef.hasAttached()) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(this.portal);
      this.addTooltipListeners();
    }
  }

  closeTooltip(): void {
    this.overlayRef?.detach();
  }

  toggleTooltip(): void {
    if (this.overlayRef?.hasAttached()) {
      this.closeTooltip();
    } else {
      this.openTooltip();
    }
  }

  private addTooltipListeners(): void {
    const tooltip = this.overlayRef?.overlayElement.querySelector(".tedi-tooltip-content");

    if (!tooltip) {
      return;
    }

    const enterListener = this.renderer.listen(tooltip, "mouseenter", () => {
      this.isTooltipHovered.set(true);
      this.clearCloseTimeout();
    });

    const leaveListener = this.renderer.listen(tooltip, "mouseleave", () => {
      this.isTooltipHovered.set(false);

      if (this.openWith() === "hover") {
        this.scheduleClose();
      }
    });

    this.eventListeners.push(enterListener, leaveListener);
  }

  private scheduleClose(): void {
    this.clearCloseTimeout();
    this.closeTimeout.set(
      setTimeout(() => this.closeTooltip(), TOOLTIP_TIMEOUT_MS)
    );
  }

  private clearCloseTimeout(): void {
    const timeout = this.closeTimeout();

    if (timeout) {
      clearTimeout(timeout);
    }
    
    this.closeTimeout.set(null);
  }

  private getOverlayConfig(): OverlayConfig {
    const positionMap = {
      top: [positionTop, positionBottom, positionLeft, positionRight],
      bottom: [positionBottom, positionTop, positionLeft, positionRight],
      left: [positionLeft, positionRight, positionTop, positionBottom],
      right: [positionRight, positionLeft, positionTop, positionBottom],
    };

    const position = this.content?.position() ?? 'top';
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger!.element()!)
      .withPositions(positionMap[position]);

    return {
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: strategy,
    };
  }
}
