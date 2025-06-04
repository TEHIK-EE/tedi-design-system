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
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";
import { DropdownItemComponent } from "../../overlay/dropdown-item/dropdown-item.component";
import { ClosingButtonComponent } from "../../buttons/closing-button/closing-button.component";
import { CheckboxComponent } from "../checkbox";
import { TagComponent } from "community/components/tag/tag.component";

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
    TextComponent,
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
    "[class.tedi-select--multiselect]": "true",
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
  /**
   * Whether the select should be rendered as a multi-row dropdown.
   * @default false
   */
  multiRow = input<boolean>(false);
  /**
   * Whether the selected labels show removing buttons.
   * @default false
   */
  clearableTags = input<boolean>(false);
  /**
   * Whether the select should allow selecting all options at once.
   * @default false
   */
  selectAll = input<boolean>(false);
  /**
   * Whether the select should allow selecting groups of options.
   * @default false
   */
  selectableGroups = input<boolean>(false);

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
  ngOnInit(): void {
    if (this.disabled()) this.setDisabledState(this.disabled());
  }

  ngAfterContentChecked(): void {
    this.setDropdownWidth();
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.setDropdownWidth();
  }

  // Event handlers
  select(value: string): void {
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

  unselect(value: string, event: Event): void {
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

  clear(): void {
    this._selectedValue.set(null);
    this.onChange(null);
    this.onTouched();
  }

  touch(): void {
    this.onTouched();
  }

  private setDropdownWidth(): void {
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

  /**
   * Checks if all available options are currently selected
   */
  areAllOptionsSelected(): boolean {
    const options = this._options()
      .filter((option) => !option.isDisabled())
      .map((option) => option.value());

    const selectedValues = this._selectedValue();

    if (!selectedValues || options.length === 0) {
      return false;
    }

    return options.every((value) => selectedValues.includes(value));
  }

  /**
   * Toggles selection of all available options
   */
  toggleSelectAll(): void {
    if (this.areAllOptionsSelected()) {
      // If all are selected, deselect all
      this._selectedValue.set(null);
    } else {
      // Otherwise, select all non-disabled options
      const allValues = this._options()
        .filter((option) => !option.isDisabled())
        .map((option) => option.value());

      this._selectedValue.set(allValues);
    }

    this.onChange(this._selectedValue());
    this.onTouched();
  }

  // Get grouped options
  getOptionGroups(): { name: string; options: SelectOptionComponent[] }[] {
    const groups = new Map<string, SelectOptionComponent[]>();

    // First pass: collect all groups
    this._options().forEach((option) => {
      const groupName = option.groupBy?.() || "";
      if (groupName) {
        if (!groups.has(groupName)) {
          groups.set(groupName, []);
        }
        groups.get(groupName)?.push(option);
      }
    });

    // Convert to array format for template
    return Array.from(groups.entries()).map(([name, options]) => ({
      name,
      options,
    }));
  }

  // Get ungrouped options
  getUngroupedOptions(): SelectOptionComponent[] {
    return this._options().filter((option) => !option.groupBy?.());
  }

  // Check if all options in a group are selected
  areAllGroupOptionsSelected(groupName: string): boolean {
    const groupOptions = this._options().filter(
      (option) => option.groupBy?.() === groupName && !option.isDisabled(),
    );

    if (groupOptions.length === 0) return false;

    const selectedValues = this._selectedValue() || [];
    return groupOptions.every((option) =>
      selectedValues.includes(option.value()),
    );
  }

  // Toggle selection for all options in a group
  toggleSelectGroup(groupName: string): void {
    const allSelected = this.areAllGroupOptionsSelected(groupName);
    const groupOptions = this._options()
      .filter(
        (option) => option.groupBy?.() === groupName && !option.isDisabled(),
      )
      .map((option) => option.value());

    let selectedValues = [...(this._selectedValue() || [])];

    if (allSelected) {
      // Unselect all in this group
      selectedValues = selectedValues.filter(
        (value) => !groupOptions.includes(value),
      );
    } else {
      // Select all in this group
      groupOptions.forEach((value) => {
        if (!selectedValues.includes(value)) {
          selectedValues.push(value);
        }
      });
    }

    this._selectedValue.set(selectedValues.length ? selectedValues : null);
    this.onChange(this._selectedValue());
    this.onTouched();
  }
}
