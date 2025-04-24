import {
  Component,
  ElementRef,
  TemplateRef,
  inject,
  input,
  viewChild,
} from "@angular/core";

@Component({
  selector: "tedi-select-option",
  standalone: true,
  imports: [],
  template: `<ng-template #optionTemplate><ng-content /></ng-template>`,
})
export class SelectOptionComponent {
  /*
   * The value of the option.
   */
  value = input.required<any>();
  /*
   * The label of the option.
   */
  label = input.required<any>();

  /*
   * Should the option be disabled?
   */
  isDisabled = input<boolean>(false);

  optionRef = inject(ElementRef);
  templateRef = viewChild("optionTemplate", { read: TemplateRef });
}
