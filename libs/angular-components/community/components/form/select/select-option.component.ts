import { Component, Input, computed, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkMenuModule, MenuStack, MENU_STACK } from "@angular/cdk/menu";
import { SelectComponent } from "./select.component";

@Component({
  selector: "tedi-select-option",
  standalone: true,
  imports: [CommonModule, CdkMenuModule],
  providers: [{ provide: MENU_STACK, useClass: MenuStack }],
  template: `
    <div
      cdkMenuItem
      role="option"
      (click)="select()"
      [attr.aria-selected]="isSelected()"
    >
      <ng-content />
    </div>
  `,
})
export class SelectOptionComponent {
  /*
   * The value of the option. This is the value that will be passed to the
   * select component when the option is selected.
   */
  value = input.required<any>();
  @Input() label!: string;

  private parent = inject(SelectComponent);

  isSelected = computed(() => {
    this.parent.selectedValue() === this.value;
  });

  select() {
    this.parent.select(this.value, this.label);
  }
}
