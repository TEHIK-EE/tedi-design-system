import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
  forwardRef,
  viewChild,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { IconComponent, ButtonComponent } from "@tehik-ee/tedi-angular/tedi";
import { FormsModule } from "@angular/forms";
import { CdkOverlayOrigin, OverlayModule } from "@angular/cdk/overlay";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards/card";
import { DropdownItemComponent } from "community/components/overlay";
import { ClosingButtonComponent } from "@tehik-ee/tedi-angular/tedi";
import { A11yModule } from "@angular/cdk/a11y";
import { CdkMenu, CdkMenuModule } from "@angular/cdk/menu";

export type SearchSize = "large" | "default" | "small";
export type AutocompleteOption = {
  value: string;
  label: string;
  description?: string;
};

@Component({
  selector: "tedi-search",
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    IconComponent,
    CdkMenuModule,
    OverlayModule,
    CardComponent,
    CardContentComponent,
    DropdownItemComponent,
    ClosingButtonComponent,
    A11yModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
  host: {
    "[class.tedi-search]": "true",
    "[class.tedi-search--with-button]": "withButton()",
    "[class.tedi-search--with-button-text]": "!!buttonText()",
    "[class.tedi-search--disabled]": "disabled()",
    "[class]": "modifierClasses()",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent
  implements AfterContentChecked, ControlValueAccessor
{
  /**
   * Search input ID for accessibility
   */
  inputId = input.required<string>();
  /**
   * Autocomplete options for the search input
   * @default []
   */
  autocompleteOptions = input<AutocompleteOption[]>([]);
  /**
   * Minimum number of characters to trigger autocomplete
   * @default 3
   */
  autocompleteFrom = input<number>(3);
  /**
   * Size of the search component
   * @default "default"
   */
  size = input<SearchSize>("default");
  /**
   * Should the search button be shown
   * @default false
   */
  withButton = input<boolean>(false);
  /**
   * Add text to the search button
   * @default undefined
   */
  buttonText = input<string | undefined>(undefined);
  /**
   * Should the search input be clearable
   * @default true
   */
  clearable = input<boolean>(true);
  /**
   * Text to show when no results are found
   * @default "Vasteid ei leitud"
   */
  noResultText = input<string>("Vasteid ei leitud");
  /**
   * Should the searc input be disabled
   * @default false
   */
  disabled = input<boolean>(false);
  /**
   * Placeholder text for the search input
   * @default ""
   */
  placeholder = input<string>("");

  // Emitted event
  searchEvent = output<AutocompleteOption | string>();

  _inputValue = model<string>();
  _selectedOption = model<AutocompleteOption>();
  _width = signal(0);
  _elementRef = inject(ElementRef);
  _disabled = signal(false);
  _isVisible = signal(false);
  _cdkMenuRef = viewChild(CdkMenu, { read: ElementRef });
  _overlayOriginRef = viewChild(CdkOverlayOrigin, { read: ElementRef });

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.size()) modifiers.push(`tedi-search--${this.size()}`);

    return modifiers.join(" ");
  });

  ngAfterContentChecked(): void {
    this._width.set(this.getWidth());
  }

  inputChanged(inputValue: string) {
    const selected = this._selectedOption();

    // Logic to show/hide the autocomplete dropdown
    if (
      inputValue &&
      inputValue.length >= this.autocompleteFrom() &&
      !this._selectedOption()
    ) {
      this._isVisible.set(true);
    } else {
      this._isVisible.set(false);
    }

    // Clear selected option if input value is changed and is not matching the selected option
    if (selected && inputValue !== selected.label) {
      this._selectedOption.set(undefined);
    }
  }

  // Filter the autocomplete options based on the input value
  _foundOptions = computed(() => {
    const inputValue = this._inputValue();
    if (!inputValue) return this.autocompleteOptions();

    return this.autocompleteOptions().filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.description?.toLowerCase().includes(inputValue.toLowerCase()),
    );
  });

  iconSize = computed(() => {
    const size = this.size();
    const hasButton = this.withButton();
    const hasButtonText = !!this.buttonText();

    if (size === "large") {
      if (hasButton && hasButtonText) return 18;
      return 24;
    } else if (size === "small") {
      if (hasButton) return 18;
      return 16;
    } else {
      return 18;
    }
  });

  buttonSize = computed(() => {
    switch (this.size()) {
      case "large":
        return "default";
      case "small":
        return "small";
      default:
        return "default";
    }
  });

  // ControlValueAccessor methods
  private onChange: (value: string | AutocompleteOption) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | AutocompleteOption): void {
    if (typeof value === "string") {
      this._inputValue.set(value);
      this._selectedOption.set(undefined);
    } else {
      this._inputValue.set(value?.label || "");
      this._selectedOption.set(value);
    }
  }

  registerOnChange(fn: (value: string | AutocompleteOption) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  searchButtonClick() {
    this.searchEvent.emit(this._selectedOption() ?? this._inputValue() ?? "");
    this.onChange(this._selectedOption() ?? this._inputValue() ?? "");
    this.onTouched();
  }

  selectResult(option: AutocompleteOption) {
    this._selectedOption.set(option);
    this._inputValue.set(option.label);

    // Emit the selected option if the search button is not shown
    if (!this.withButton()) {
      this.searchEvent.emit(option);
      this.onChange(option);
    }

    this.onTouched();
    this.closeOverlay(true);
  }

  clearResult() {
    this._inputValue.set("");
    this._selectedOption.set(undefined);
    this.searchEvent.emit("");
    this.onChange("");
    this.onTouched();
  }

  focusDropdown(event?: Event) {
    // Prevent default behavior and stop propagation if event is provided
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const dropdownToFocus = this._cdkMenuRef();

    if (dropdownToFocus) {
      dropdownToFocus.nativeElement.focus();
    }
  }

  closeOverlay(focusBackToInput: boolean) {
    this._isVisible.set(false);

    if (focusBackToInput) {
      this._overlayOriginRef()?.nativeElement?.focus();
    }
  }

  getWidth(): number {
    return this._elementRef?.nativeElement?.getBoundingClientRect()?.width || 0;
  }
}
