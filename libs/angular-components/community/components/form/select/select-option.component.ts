import {
  Component,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  inject,
  input,
  viewChild,
} from "@angular/core";
import { SelectComponent } from "./select.component";

@Component({
  selector: "tedi-select-option",
  standalone: true,
  imports: [],
  template: `<ng-content />`,
})
export class SelectOptionComponent {
  /*
   * The value of the option.
   */
  value = input.required<any>();

  /*
   * Should the option be disabled?
   */
  isDisabled = input<boolean>(false);

  // #parent = inject(SelectComponent);
  optionRef = inject(ElementRef);
  template = contentChild(TemplateRef);

  // isSelected = computed(() => {
  //   return this.#parent._selectedValue() === this.value();
  // });

  // select() {
  //   const labelText = this.optionRef.nativeElement?.textContent?.trim();
  //   this.#parent.select(this.value(), labelText);
  // }
}
