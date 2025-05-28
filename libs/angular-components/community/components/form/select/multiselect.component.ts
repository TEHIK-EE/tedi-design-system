import {
  Component,
  signal,
  forwardRef,
  input,
  ElementRef,
  HostListener,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  contentChildren,
  AfterContentChecked,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkMenuModule } from "@angular/cdk/menu";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectOptionComponent } from "./select-option.component";
import {
  InputComponent,
  InputSize,
  InputState,
} from "../input/input.component";
import { CardComponent, CardContentComponent } from "../../cards/card";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { DropdownItemComponent } from "../../overlay/dropdown-item/dropdown-item.component";
import { ClosingButtonComponent } from "../../buttons/closing-button/closing-button.component";
import { CheckboxComponent } from "../checkbox";
import { TagComponent } from "community/components/tag";

@Component({
  selector: "tedi-multiselect",
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    InputComponent,
    CardComponent,
    CardContentComponent,
    IconComponent,
    DropdownItemComponent,
    ClosingButtonComponent,
    CheckboxComponent,
    TagComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./multiselect.component.html",
  styleUrl: "./select.component.scss", // Reuse the same styles
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true,
    },
  ],
  host: {
    "[class.tedi-select]": "true",
  },
})
export class MultiselectComponent
  implements ControlValueAccessor, OnInit, AfterContentChecked
{
  /**
   * The placeholder text to display when no option is selected.
   * @default ""
   */
  placeholder = input<string>("");
  /**
   * Is the select disabled?
   * @default false
   */
  disabled = input<boolean>(false);
  /**
   * The state of the input.
   * @default "default"
   */
  state = input<InputState>("default");
  /**
   * The size of the input.
   * @default "default"
   */
  size = input<InputSize>("default");

  // Internal state
  _selectedValue = signal<string[] | null>(null);
  _disabled = signal<boolean>(false);
  _width = signal<number>(0);
  _options = contentChildren(SelectOptionComponent);

  private selectRef = inject(ElementRef);

  // ControlValueAccessor methods
  private onChange: (value: string[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[] | null): void {
    if (value === null || value === undefined || !Array.isArray(value)) {
      this._selectedValue.set(null);
      return;
    }

    this._selectedValue.set(value.length > 0 ? value : null);
  }

  registerOnChange(fn: (value: string[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  // Lifecycle hooks
  ngOnInit() {
    if (this.disabled()) this.setDisabledState(this.disabled());
  }

  ngAfterContentChecked() {
    this.setDropdownWidth();
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.setDropdownWidth();
  }

  // Event handlers
  select(value: string) {
    const currentValue = this._selectedValue() ?? [];
    const selectedValues = [...currentValue];

    // Toggle selection
    const index = selectedValues.indexOf(value);
    if (index === -1) {
      selectedValues.push(value);
    } else {
      selectedValues.splice(index, 1);
    }

    this._selectedValue.set(selectedValues.length ? selectedValues : null);
    this.onChange(this._selectedValue());
    this.onTouched();
  }

  unselect(value: string, event: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const currentValue = this._selectedValue() ?? [];
    const index = currentValue.indexOf(value);
    if (index !== -1) {
      currentValue.splice(index, 1);
      this._selectedValue.set(currentValue.length ? currentValue : null);
      this.onChange(this._selectedValue());
      this.onTouched();
    }
  }

  clear() {
    this._selectedValue.set(null);
    this.onChange(null);
    this.onTouched();
  }

  touch() {
    this.onTouched();
  }

  private setDropdownWidth() {
    const computedWidth =
      this.selectRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this._width.set(computedWidth);
  }

  isOptionSelected(value: string): boolean {
    const selectedValue = this._selectedValue();
    if (!selectedValue) return false;
    return selectedValue.includes(value);
  }

  getOptionLabel(value: string): string | null {
    return (
      this._options()
        .find((option) => option.value() === value)
        ?.label() || value
    );
  }
}
