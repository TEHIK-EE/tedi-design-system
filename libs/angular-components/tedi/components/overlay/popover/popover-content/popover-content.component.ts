import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { ClosingButtonComponent } from "../../../buttons/closing-button/closing-button.component";
import { PopoverComponent } from "../popover.component";
  
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
     * The width of the popover. Can be 'none', 'small', 'medium', or 'large'.
     * @default small
     */
    maxWidth = input<PopoverWidth>("small");
    /**
     * Heading title of the content
     */
    title = input("");
    /**
     * Should content show close button?
     * @default false
     */
    showClose = input(false);

    private popover = inject(PopoverComponent, { optional: true });
    titleId = `popover-title-${popoverTitleId++}`;

    classes = computed(() => {
        const classList = ["tedi-popover-content", `tedi-popover-content--${this.maxWidth()}`];
        return classList.join(" ");
    })

    handleClose() {
        this.popover?.floatUiComponent.hide();
    }
}