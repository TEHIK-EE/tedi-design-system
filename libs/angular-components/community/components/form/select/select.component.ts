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
  computed,
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
  selector: "tedi-select",
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
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  host: {
    "[class.tedi-select]": "true",
  },
})
export class SelectComponent
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
  /**
   * Enable multi-selection mode.
   * @default false
   */
  multiselect = input<boolean>(false);

  // Internal state
  _selectedValue = signal<string | string[] | null>(null);
  _disabled = signal<boolean>(false);
  _width = signal<number>(0);
  _options = contentChildren(SelectOptionComponent);

  private selectRef = inject(ElementRef);

  // ControlValueAccessor methods
  private onChange: (value: string | string[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | string[] | null): void {
    if (value === null || value === undefined) {
      this._selectedValue.set(null);
      return;
    }

    if (this.multiselect() && !Array.isArray(value)) {
      // Convert single value to array for multiselect mode
      this._selectedValue.set([value]);
    } else if (!this.multiselect() && Array.isArray(value)) {
      // Take the first value if single select mode but array provided
      this._selectedValue.set(value.length > 0 ? value[0] : null);
    } else {
      this._selectedValue.set(value);
    }
  }
  registerOnChange(fn: (value: string | string[] | null) => void): void {
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
    if (this.multiselect()) {
      const currentValue = this._selectedValue() ?? [];
      const selectedValues = Array.isArray(currentValue)
        ? [...currentValue]
        : [currentValue];

      // Toggle selection for multiselect
      const index = selectedValues.indexOf(value);
      if (index === -1) {
        selectedValues.push(value);
      } else {
        selectedValues.splice(index, 1);
      }

      this._selectedValue.set(selectedValues.length ? selectedValues : null);
    } else {
      this._selectedValue.set(value);
    }

    this.onChange(this._selectedValue());
    this.onTouched();
  }

  unselect(value: string, event: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (!this.multiselect()) return;

    const currentValue = this._selectedValue() ?? [];
    if (!Array.isArray(currentValue)) return;

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

  selectedLabel = computed(() => {
    const value = this._selectedValue();

    if (!value) return null;

    if (this.multiselect() && Array.isArray(value)) {
      if (value.length === 0) return null;

      const labels = value
        .map((v) =>
          this._options()
            .find((option) => option.value() === v)
            ?.label(),
        )
        .filter(Boolean);

      return labels.join(", ");
    }

    const singleValue = Array.isArray(value) ? value[0] : value;
    return this._options()
      .find((option) => option.value() === singleValue)
      ?.label();
  });

  private setDropdownWidth() {
    const computedWidth =
      this.selectRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this._width.set(computedWidth);
  }

  isOptionSelected(value: string): boolean {
    const selectedValue = this._selectedValue();
    if (!selectedValue) return false;

    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }

    return selectedValue === value;
  }

  getOptionLabel(value: string): string | null {
    return (
      this._options()
        .find((option) => option.value() === value)
        ?.label() || value
    );
  }
}
