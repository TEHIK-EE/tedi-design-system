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
import { PopoverTriggerComponent } from "./popover-trigger.component";
import { PopoverContentComponent } from "./popover-content.component";

export const POPOVER_ARROW_OFFSET = 18;
export const POPOVER_TIMEOUT_MS = 150;

const positionTop: ConnectedPosition = {
  originX: "center",
  originY: "top",
  overlayX: "center",
  overlayY: "bottom",
  panelClass: "tedi-popover-content__arrow--top",
  offsetY: -POPOVER_ARROW_OFFSET,
};

const positionBottom: ConnectedPosition = {
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
  panelClass: "tedi-popover-content__arrow--bottom",
  offsetY: POPOVER_ARROW_OFFSET,
};

const positionRight: ConnectedPosition = {
  originX: "end",
  originY: "center",
  overlayX: "start",
  overlayY: "center",
  panelClass: "tedi-popover-content__arrow--left",
  offsetX: POPOVER_ARROW_OFFSET,
};

const positionLeft: ConnectedPosition = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
  panelClass: "tedi-popover-content__arrow--right",
  offsetX: -POPOVER_ARROW_OFFSET,
};

export type PopoverOpenWith = "click" | "hover";

/**
 * PopoverComponent is a component that displays a Popover when the user hovers over or clicks on an element.
 * It uses the Angular CDK Overlay module to create a flexible connected overlay that can be positioned relative to the trigger element.
 * The Popover can be configured to open on hover or click, and can be positioned at the top, bottom, left, or right of the trigger element.
 *
 * Angular CDK Overlay: How positioning works:
 * https://www.youtube.com/watch?v=IpRQBtBN3iU&ab_channel=BrianTreese
 *
 * Angular CDK Overlay: Adding accessibility features
 * https://www.youtube.com/watch?v=_0JGZATel-8&ab_channel=BrianTreese
 */

@Component({
  standalone: true,
  selector: "tedi-popover",
  imports: [OverlayModule, PortalModule],
  templateUrl: "./popover.component.html",
  styleUrl: "./popover.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent implements AfterContentInit, OnDestroy {
  /**
   * The trigger event that opens the popover. Can be 'click' or 'hover'.
   * @default click
   */
  openWith = input<PopoverOpenWith>("click");

  @ContentChild(PopoverTriggerComponent) trigger?: PopoverTriggerComponent;
  @ContentChild(PopoverContentComponent) content?: PopoverContentComponent;
  @ViewChild(CdkPortal, { static: true }) portal!: CdkPortal;

  private overlayRef?: OverlayRef;
  private readonly overlay = inject(Overlay);
  private readonly renderer = inject(Renderer2);
  private readonly eventListeners: (() => void)[] = [];

  closeTimeout = signal<ReturnType<typeof setTimeout> | null>(null);
  private isTriggerHovered = signal(false);
  private isPopoverHovered = signal(false);

  ngAfterContentInit(): void {
    const trigger = this.trigger?.host.nativeElement as HTMLElement | undefined;

    if (!trigger) {
      return;
    }

    this.eventListeners.push(
      this.renderer.listen(trigger, "focus", () => {
        if (!this.isTriggerHovered()) {
          this.openPopover()
        }
      }),
      this.renderer.listen(trigger, "blur", () => {
        if (!this.isPopoverHovered()) {
          this.closePopover();
        }
      }),
      this.renderer.listen(trigger, "mouseenter", () => {
        this.isTriggerHovered.set(true);

        if (this.openWith() === "hover") {
          this.openPopover();
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
          this.togglePopover()
        }
      }),
      this.renderer.listen("document", "click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const clickedInsideTrigger = trigger.contains(target);
        const popover = this.overlayRef?.overlayElement;
        const clickedInsidePopover = popover?.contains(target);
  
        if (!clickedInsideTrigger && !clickedInsidePopover) {
          this.closePopover();
        }
      }),
      this.renderer.listen("document", "keydown", (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          this.closePopover();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.eventListeners.forEach(off => off());
    this.eventListeners.length = 0;
    this.closePopover();
  }

  openPopover(): void {
    this.clearCloseTimeout();

    if (!this.overlayRef || !this.overlayRef.hasAttached()) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(this.portal);
      this.addPopoverListeners();
    }

    if (this.trigger?.host.nativeElement) {
      this.renderer.setAttribute(this.trigger.host.nativeElement, 'data-open', 'true');
    }
  }

  closePopover(): void {
    this.overlayRef?.detach();

    if (this.trigger?.host.nativeElement) {
      this.renderer.removeAttribute(this.trigger.host.nativeElement, 'data-open');
    }
  }

  togglePopover(): void {
    if (this.overlayRef?.hasAttached()) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  private addPopoverListeners(): void {
    const popover = this.overlayRef?.overlayElement.querySelector(".tedi-popover-content");

    if (!popover) {
      return;
    }

    const enterListener = this.renderer.listen(popover, "mouseenter", () => {
      this.isPopoverHovered.set(true);
      this.clearCloseTimeout();
    });

    const leaveListener = this.renderer.listen(popover, "mouseleave", () => {
      this.isPopoverHovered.set(false);

      if (this.openWith() === "hover") {
        this.scheduleClose();
      }
    });

    this.eventListeners.push(enterListener, leaveListener);
  }

  private scheduleClose(): void {
    this.clearCloseTimeout();
    this.closeTimeout.set(
      setTimeout(() => this.closePopover(), POPOVER_TIMEOUT_MS)
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
      .flexibleConnectedTo(this.trigger!.host.nativeElement)
      .withPositions(positionMap[position]);

    return {
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: strategy,
    };
  }
}
