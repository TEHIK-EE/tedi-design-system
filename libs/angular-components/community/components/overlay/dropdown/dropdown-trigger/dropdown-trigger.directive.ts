import { computed, Directive, inject } from "@angular/core";
import { DropdownComponent } from "../dropdown.component";
import { CdkOverlayOrigin } from "@angular/cdk/overlay";

@Directive({
  selector: "[tedi-dropdown-trigger]",
  host: {
    "[attr.aria-has-popup]": "ariaAttributes().hasPopup",
    "[attr.aria-expanded]": "ariaAttributes().expanded",
    "[attr.aria-controls]": "ariaAttributes().controls",
    "(click)": "onClick()",
  },
  hostDirectives: [CdkOverlayOrigin],
})
export class DropdownTriggerDirective {
  private dropdownContext = inject(DropdownComponent);

  readonly overlayOrigin = inject(CdkOverlayOrigin, { self: true });

  ariaAttributes = computed(() => {
    if (!this.dropdownContext.dropdownRole()) return {};
    return {
      hasPopup: this.dropdownContext.dropdownRole(),
      expanded: this.dropdownContext.opened() ? "true" : "false",
      controls: this.dropdownContext.opened()
        ? this.dropdownContext.dropdownId()
        : undefined,
    };
  });

  onClick() {
    this.dropdownContext.toggle();
  }
}
