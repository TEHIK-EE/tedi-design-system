import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
  
export type PopoverPosition = "top" | "bottom" | "left" | "right";
export type PopoverWidth = "none" | "small" | "medium" | "large";
  
@Component({
    standalone: true,
    selector: "tedi-popover-content",
    template: "<ng-content />",
    styleUrl: "./popover.component.scss",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[class]": "classes()",
        "role": "tooltip",
    }
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
     * @default medium
     */
    maxWidth = input<PopoverWidth>("medium");
    /**
     * Does overlay have illustrative border on the arrow side?
     */
    withBorder = input(false);

    classes = computed(() => {
        const classList = ["tedi-popover-content", `tedi-popover-content--${this.maxWidth()}`];

        if (this.withBorder()) {
            classList.push("tedi-popover-content--border");
        }

        return classList.join(" ");
    })
}