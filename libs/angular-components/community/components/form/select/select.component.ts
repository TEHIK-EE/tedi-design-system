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
import {
  ComponentInputs,
  FeedbackTextComponent,
  IconComponent,
  LabelComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { DropdownItemComponent } from "../../overlay/dropdown-item/dropdown-item.component";
import { ClosingButtonComponent } from "@tehik-ee/tedi-angular/tedi";

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
    LabelComponent,
    FeedbackTextComponent,
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
   * The label for the select input.
   * @default ""
   */
  label = input<string>();
  /**
   * The id of the select input (for label association).
   * @default ""
   */
  inputId = input.required<string>();
  /**
   * Should show label as required?
   * @default false
   */
  required = input<boolean>(false);
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
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  // Internal state
  _selectedValue = signal<string | null>(null);
  _disabled = signal<boolean>(false);
  _width = signal<number>(0);
  _options = contentChildren(SelectOptionComponent);

  private selectRef = inject(ElementRef);

  // ControlValueAccessor methods
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    if (value === null || value === undefined) {
      this._selectedValue.set(null);
      return;
    }

    if (Array.isArray(value)) {
      // Take the first value if array is provided
      this._selectedValue.set(value.length > 0 ? value[0] : null);
    } else {
      this._selectedValue.set(value);
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
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
    this._selectedValue.set(value);
    this.onChange(this._selectedValue());
    this.onTouched();
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

    return this._options()
      .find((option) => option.value() === value)
      ?.label();
  });

  private setDropdownWidth() {
    const computedWidth =
      this.selectRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this._width.set(computedWidth);
  }

  isOptionSelected(value: string): boolean {
    return this._selectedValue() === value;
  }

  getOptionLabel(value: string): string | null {
    return (
      this._options()
        .find((option) => option.value() === value)
        ?.label() || value
    );
  }
}
