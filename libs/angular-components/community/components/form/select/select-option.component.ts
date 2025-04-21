import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkMenuItem } from "@angular/cdk/menu";
import { SelectComponent } from "./select.component";

@Component({
  selector: "app-custom-option",
  standalone: true,
  imports: [CommonModule, CdkMenuItem],
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
      div[cdkMenuItem] {
        padding: 0.5rem;
        cursor: pointer;
      }

      div[cdkMenuItem][aria-selected="true"] {
        background-color: #e0e0e0;
      }
    `,
  ],
})
export class CustomOptionComponent {
  @Input() value: any;
  @Input() label!: string;

  private parent = inject(SelectComponent);

  isSelected = () => this.parent.selectedValue() === this.value;

  select() {
    this.parent.select(this.value, this.label);
  }
}
