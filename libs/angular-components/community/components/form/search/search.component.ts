import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
  forwardRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { ButtonComponent } from "community/components/buttons/button/button.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { FormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkMenuModule, CdkMenuTrigger } from "@angular/cdk/menu";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards/card";
import { DropdownItemComponent } from "community/components/overlay";
import { CloseButtonComponent } from "community/components/buttons";

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
    OverlayModule,
    CdkMenuModule,
    CardComponent,
    CardContentComponent,
    DropdownItemComponent,
    CloseButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
  host: {
    "[class.tedi-search]": "true",
    "[class.tedi-search--with-button]": "withButton()",
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

  // Emitted event
  onSelect = output<AutocompleteOption | string>();

  _inputValue = model<string>();
  _selectedOption = model<AutocompleteOption>();
  _width = signal(0);
  _elementRef = inject(ElementRef);
  _trigger = viewChild(CdkMenuTrigger);

  ngAfterContentChecked(): void {
    this._width.set(this.getWidth());
  }

  _foundOptions = computed(() => {
    const inputValue = this._inputValue();
    if (!inputValue) return this.autocompleteOptions();

    return this.autocompleteOptions().filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.description?.toLowerCase().includes(inputValue.toLowerCase()),
    );
  });

  _isOpen = computed(() => {
    return this._trigger()?.isOpen();
  });

  effect = effect(() => {
    const inputValue = this._inputValue();
    if (inputValue && inputValue.length >= this.autocompleteFrom()) {
      this._trigger()?.open();
    }
  });

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.size()) modifiers.push(`tedi-search--${this.size()}`);

    return modifiers.join(" ");
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
        return "medium";
      case "small":
        return "small";
      default:
        return "medium";
    }
  });

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
    // Implement logic to disable the component if needed
  }

  searchButtonClick() {
    this.onSelect.emit(this._selectedOption() ?? this._inputValue() ?? "");
    this.onChange(this._selectedOption() ?? this._inputValue() ?? "");
    this.onTouched();
  }

  selectResult(option: AutocompleteOption) {
    this._selectedOption.set(option);
    this._inputValue.set(option.label);

    if (!this.withButton()) {
      this.onSelect.emit(option);
      this.onChange(option);
    }
    this.onTouched();
  }

  clearResult(event: Event) {
    event.stopPropagation();
    this._inputValue.set("");
    this._selectedOption.set(undefined);
    this.onSelect.emit("");
    this.onChange("");
    this.onTouched();
  }

  getWidth(): number {
    return this._elementRef?.nativeElement?.getBoundingClientRect()?.width || 0;
  }
}
