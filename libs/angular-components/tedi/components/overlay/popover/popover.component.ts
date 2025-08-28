import { DOCUMENT } from "@angular/common";
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  ViewChild,
  inject,
  Renderer2,
} from "@angular/core";
import { NgxFloatUiContentComponent, NgxFloatUiModule, NgxFloatUiPlacements, NgxFloatUiTriggers } from "ngx-float-ui";

export type PopoverOpenWith = `${NgxFloatUiTriggers}`;
export type PopoverPosition = `${NgxFloatUiPlacements}`;

@Component({
  standalone: true,
  selector: "tedi-popover",
  imports: [NgxFloatUiModule],
  templateUrl: "./popover.component.html",
  styleUrl: "./popover.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
    /**
     * * The trigger event that opens the popover.
     * * @default click
     * */
    openWith = input<PopoverOpenWith>("click");
    /**
     * The position of the popover relative to the trigger element.
     * @default top
     */
    position = input<PopoverPosition>("top");
     /**
     * Is dismissible by clicking outside of content?
     * @default true
     */
    dismissible = input(true);
    /**
     * Does popover content hide on scroll?
     * @default false
     */
    hideOnScroll = input(false);
    /**
     * Does popover have illustrative border on the arrow side?
     * @default false
     */
    withBorder = input(false);
    /**
     * Lock scrolling on rest of the page?
     * @default false
     */
    lockScroll = input(false);
    
    @ViewChild('floatUiComponent') floatUiComponent!: NgxFloatUiContentComponent;
    private readonly document = inject(DOCUMENT);
    private readonly renderer = inject(Renderer2);

    onHide() {
      if (this.lockScroll()) {
        this.renderer.removeStyle(this.document.body, 'overflow');
      }
    }

    onOpen() {
      if (this.lockScroll()) {
        this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      }
    }
}