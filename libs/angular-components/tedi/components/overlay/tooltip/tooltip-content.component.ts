import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from "@angular/core";
  
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipWidth = "none" | "small" | "medium" | "large";
  
@Component({
    standalone: true,
    selector: "tedi-tooltip-content",
    template: "<ng-content />",
    styleUrl: "./tooltip.component.scss",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[class]": "classes()",
        "role": "tooltip",
    }
})
export class TooltipContentComponent {
    /**
     * The position of the tooltip relative to the trigger element. If tooltip can't
     * be positioned in the specified direction, the CDK will try to position the tooltip
     * in the next direction in positions list.
     * @default top
     */
    position = input<TooltipPosition>("top");
    /**
     * The width of the tooltip. Can be 'none', 'small', 'medium', or 'large'.
     * @default medium
     */
    maxWidth = input<TooltipWidth>("medium");

    classes = computed(() => {
        return ["tedi-tooltip-content", `tedi-tooltip-content--${this.maxWidth()}`].join(" ");
    })
}