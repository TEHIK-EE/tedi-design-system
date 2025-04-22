import { Component, ElementRef, computed, inject, input } from "@angular/core";
import { CdkMenuModule, MenuStack, MENU_STACK } from "@angular/cdk/menu";
import { SelectComponent } from "./select.component";
import { DropdownItemComponent } from "../../overlay/dropdown-item/dropdown-item.component";

@Component({
  selector: "tedi-select-option",
  standalone: true,
  imports: [CdkMenuModule, DropdownItemComponent],
  providers: [{ provide: MENU_STACK, useClass: MenuStack }],
  template: `
    <div
      cdkMenuItem
      tedi-dropdown-item
      role="option"
      (cdkMenuItemTriggered)="select()"
      [selected]="isSelected()"
      [disabled]="isDisabled()"
      [attr.tabindex]="isDisabled() ? -1 : 0"
      [attr.aria-selected]="isSelected()"
      [attr.aria-disabled]="isDisabled()"
    >
      <ng-content />
    </div>
  `,
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

  #parent = inject(SelectComponent);
  optionRef = inject(ElementRef);

  isSelected = computed(() => {
    return this.#parent._selectedValue() === this.value();
  });

  select() {
    const labelText = this.optionRef.nativeElement?.textContent?.trim();
    this.#parent.select(this.value(), labelText);
  }
}
