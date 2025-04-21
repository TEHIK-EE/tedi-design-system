import { Component, Input, computed, inject } from "@angular/core";
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
  styles: [
    `
      :host {
        display: block;
      }

      div[cdkMenuItem] {
        padding: 0.5rem;
        cursor: pointer;
      }

      div[cdkMenuItem][aria-selected="true"] {
        background-color: #e0e0e0;
      }

      div[cdkMenuItem]:hover {
        background-color: #f0f0f0;
      }
    `,
  ],
})
export class CustomOptionComponent {
  @Input() value: any;
  @Input() label!: string;

  private parent = inject(SelectComponent);

  isSelected = computed(() => {
    this.parent.selectedValue() === this.value;
  });

  select() {
    this.parent.select(this.value, this.label);
  }
}
