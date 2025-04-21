import {
  Component,
  ElementRef,
  computed,
  inject,
  input,
  AfterContentInit,
} from "@angular/core";
import { CdkMenuModule, MenuStack, MENU_STACK } from "@angular/cdk/menu";
import { SelectComponent } from "./select.component";
import { DropdownItemComponent } from "./dropdown-item.component";

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
export class SelectOptionComponent implements AfterContentInit {
  /*
   * The value of the option.
   */
  value = input.required<any>();

  /*
   * Should the option be disabled?
   */
  isDisabled = input<boolean>(false);

  private parent = inject(SelectComponent);
  private elementRef = inject(ElementRef);
  // Make contentText public so it can be accessed by the parent component
  contentText: string = "";

  isSelected = computed(() => {
    return this.parent._selectedValue() === this.value();
  });

  ngAfterContentInit() {
    // Extract text content from the component to use as label
    this.contentText = this.elementRef.nativeElement.textContent.trim();
  }

  select() {
    this.parent.select(this.value(), this.contentText);
  }
}
