import {
  Component,
  signal,
  WritableSignal,
  forwardRef,
  input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkMenuModule } from "@angular/cdk/menu";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-custom-select",
  standalone: true,
  imports: [CommonModule, CdkMenuModule],
  template: `
    <button
      type="button"
      cdkMenuTriggerFor="menu"
      [disabled]="disabled()"
      (click)="onTouched()"
    >
      @if (selectedLabel()) {
        {{ selectedLabel() }}
      } @else {
        {{ placeholder() }}
      }
    </button>

    <ng-template #menu>
      <div cdkMenu class="custom-select-menu">
        <ng-content />
      </div>
    </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  styles: [
    `
      button {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
      }
      .custom-select-menu {
        padding: 0.5rem;
        background: white;
        border: 1px solid #ccc;
        border-radius: 0.375rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class SelectComponent implements ControlValueAccessor {
  placeholder = input<string>("Select...");

  selectedValue: WritableSignal<any> = signal(null);
  selectedLabel: WritableSignal<string | null> = signal(null);
  disabled = signal(false);

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  select(value: any, label: string) {
    this.selectedValue.set(value);
    this.selectedLabel.set(label);
    this.onChange(value);
    this.onTouched();
  }
}
