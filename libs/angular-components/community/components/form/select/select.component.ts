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
  AfterContentInit,
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
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards/card";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { DropdownItemComponent } from "community/components/overlay/dropdown-item/dropdown-item.component";
import { CloseButtonComponent } from "community/components/buttons/closing-button/closing-button.component";

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
    CloseButtonComponent,
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
export class SelectComponent<T = unknown>
  implements ControlValueAccessor, OnInit, AfterContentInit
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
  _selectedValue = signal<T | null>(null);
  _disabled = signal<boolean>(false);
  _width = signal<number>(0);
  _options = contentChildren(SelectOptionComponent);

  private selectRef = inject(ElementRef);

  // ControlValueAccessor methods
  private onChange: (value: T | null) => void = () => {};
  onTouched = () => {};

  writeValue(value: T | null): void {
    if (value === null || value === undefined) return;
    this.select(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
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

  ngAfterContentInit() {
    this.setDropdownWidth();
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.setDropdownWidth();
  }

  // Event handlers
  select(value: unknown): void {
    this._selectedValue.set(value as T);
    this.onChange(value as T);
    this.onTouched();
  }

  clear() {
    this._selectedValue.set(null);
    this.onChange(null);
    this.onTouched();
  }

  selectedLabel = computed(() =>
    this._options()
      .find((option) => option.value() === this._selectedValue())
      ?.label(),
  );

  private setDropdownWidth() {
    const computedWidth =
      this.selectRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this._width.set(computedWidth);
  }
}
