import {
  Component,
  signal,
  forwardRef,
  input,
  ElementRef,
  AfterViewInit,
  HostListener,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  contentChildren,
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
    { provide: MENU_STACK, useClass: MenuStack },
  ],
  host: {
    "[class.tedi-select]": "true",
  },
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
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

  // Internal state
  _selectedValue = signal<any>(null);
  _selectedLabel = signal<string | null>(null);
  _disabled = signal<boolean>(false);
  _width = signal<number>(0);
  _options = contentChildren(SelectOptionComponent);

  #selectRef = inject(ElementRef);

  // ControlValueAccessor methods
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (!value) return;

    const labelText =
      this._options()
        .find((option) => option.value() === value)
        ?.optionRef?.nativeElement?.textContent?.trim() ?? null;

    this.select(value, labelText);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  select(value: any, label: string) {
    this.prefill(value, label);
    this.onChange(value);
    this.onTouched();
  }

  clear() {
    this.prefill(null, null);
    this.onChange(null);
    this.onTouched();
  }

  ngAfterViewInit() {
    this.setDropdownWidth();
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.setDropdownWidth();
  }

  private setDropdownWidth() {
    const computedWidth =
      this.#selectRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this._width.set(computedWidth);
  }

  private prefill(value: any, label: string | null) {
    this._selectedValue.set(value);
    this._selectedLabel.set(label);
  }
}
