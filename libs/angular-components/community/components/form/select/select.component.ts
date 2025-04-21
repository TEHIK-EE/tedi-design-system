import {
  Component,
  signal,
  WritableSignal,
  forwardRef,
  input,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkMenuModule, MenuStack, MENU_STACK } from "@angular/cdk/menu";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectOptionComponent } from "./select-option.component";
import { InputComponent } from "../input/input.component";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards/card";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: "tedi-select",
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    InputComponent,
    CardComponent,
    CardContentComponent,
    IconComponent,
  ],
  templateUrl: "./select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    { provide: MENU_STACK, useClass: MenuStack },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit {
  /**
   * The placeholder text to display when no option is selected.
   * @default "Select..."
   */
  placeholder = input<string>("Select...");

  @ContentChildren(SelectOptionComponent)
  options!: QueryList<SelectOptionComponent>;

  selectedValue: WritableSignal<any> = signal(null);
  selectedLabel: WritableSignal<string | null> = signal(null);
  disabled = signal(false);

  onChange = (value: any) => {};
  onTouched = () => {};

  ngAfterContentInit() {
    // For debugging
    console.log("Content initialized:", this.options?.length);
  }

  writeValue(value: any): void {
    this.selectedValue.set(value);

    // Update the label if we have options and the value matches one of them
    if (this.options) {
      const option = this.options.find((opt) => opt.value === value);
      if (option) {
        this.selectedLabel.set(option.label);
      }
    }
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
