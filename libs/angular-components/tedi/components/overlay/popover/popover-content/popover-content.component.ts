import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { ClosingButtonComponent } from "../../../buttons/closing-button/closing-button.component";
import { PopoverComponent } from "../popover.component";
  
export type PopoverPosition = "top" | "bottom" | "left" | "right";
export type PopoverWidth = "none" | "small" | "medium" | "large";

let popoverTitleId = 0;

@Component({
    standalone: true,
    selector: "tedi-popover-content",
    templateUrl: "./popover-content.component.html",
    styleUrl: "../popover.component.scss",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, ClosingButtonComponent],
    host: {
        "[class]": "classes()",
        "role": "dialog",
        "[attr.aria-labelledby]": "title() ? titleId : null",
    },
})
export class PopoverContentComponent {
    /**
     * The position of the popover relative to the trigger element. If popover can't
     * be positioned in the specified direction, the CDK will try to position the popover
     * in the next direction in positions list.
     * @default top
     */
    position = input<PopoverPosition>("top");
    /**
     * The width of the popover. Can be 'none', 'small', 'medium', or 'large'.
     * @default small
     */
    maxWidth = input<PopoverWidth>("small");
    /**
     * Heading title of the content
     */
    title = input("");
    /**
     * Does popover have illustrative border on the arrow side?
     * @default false
     */
    withBorder = input(false);
    /**
     * Should content show close button?
     * @default false
     */
    showClose = input(false);

    private popover = inject(PopoverComponent, { optional: true });
    titleId = `popover-title-${popoverTitleId++}`;

    classes = computed(() => {
        const classList = ["tedi-popover-content", `tedi-popover-content--${this.maxWidth()}`];

        if (this.withBorder()) {
            classList.push("tedi-popover-content--border");
        }

        return classList.join(" ");
    })

    handleClose() {
        this.popover?.closePopover();
    }
}