import { Component, TemplateRef, input, viewChild } from "@angular/core";

@Component({
  selector: "tedi-select-option",
  standalone: true,
  imports: [],
  template: `<ng-template><ng-content /></ng-template>`,
})
export class SelectOptionComponent {
  /*
   * The value of the option.
   */
  value = input.required();
  /*
   * The label of the option.
   */
  label = input.required<string>();
  /*
   * Should the option be disabled?
   */
  isDisabled = input<boolean>(false);

  templateRef = viewChild(TemplateRef);
}
