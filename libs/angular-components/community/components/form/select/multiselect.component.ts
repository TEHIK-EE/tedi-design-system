import { CdkOverlayOrigin, OverlayModule } from "@angular/cdk/overlay";
import { CdkListbox, CdkListboxModule } from "@angular/cdk/listbox";
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
  forwardRef,
  computed,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  InputComponent,
  InputSize,
  InputState,
} from "../input/input.component";
import { SelectOptionComponent } from "./select-option.component";
import { CommonModule } from "@angular/common";
import { CheckboxComponent } from "../checkbox";
import {
  ClosingButtonComponent,
  ComponentInputs,
  FeedbackTextComponent,
  IconComponent,
  LabelComponent,
  TediTranslationPipe,
  TextComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { CardComponent, CardContentComponent } from "../../../components/cards";
import { DropdownItemComponent } from "../../../components/overlay";
import { TagComponent } from "../../../components/tags";

export enum specialOptionControls {
  SELECT_ALL = "SELECT_ALL",
  SELECTGROUP = "SELECTGROUP_",
}

@Component({
  selector: "tedi-multiselect",
  imports: [
    CommonModule,
    OverlayModule,
    CdkListboxModule,
    InputComponent,
    CardComponent,
    CardContentComponent,
    DropdownItemComponent,
    ClosingButtonComponent,
    IconComponent,
    LabelComponent,
    FeedbackTextComponent,
    TextComponent,
    CheckboxComponent,
    TagComponent,
    TediTranslationPipe,
  ],
  templateUrl: "./multiselect.component.html",
  styleUrl: "./select.component.scss",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-select tedi-select--multiselect",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true,
    },
  ],
})
export class MultiselectComponent
  implements AfterContentChecked, ControlValueAccessor
{
  /**
   * The id of the select input (for label association).
   * @default ""
   */
  inputId = input.required<string>();
  /**
   * The label for the select input.
   * @default ""
   */
  label = input<string>();
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
  /**
   * Whether the clear button will be shown when an option is selected.
   * @default true
   */
  clearable = input<boolean>(true);
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  readonly specialOptionControls = specialOptionControls;

  isOpen = signal(false);
  selectedOptions = signal<readonly string[]>([]);
  listboxRef = viewChild(CdkListbox, { read: ElementRef });
  triggerRef = viewChild(CdkOverlayOrigin, { read: ElementRef });
  hostRef = inject(ElementRef);
  options = contentChildren(SelectOptionComponent);
  dropdownWidth = signal(0);
  disabled = signal(false);

  optionGroups = computed(() => {
    const groups: { label: string; options: SelectOptionComponent[] }[] = [];
    this.options().forEach((option) => {
      const group = groups.find((g) => g.label === option.group());
      if (group) {
        group.options.push(option);
      } else {
        groups.push({ label: option.group() ?? "", options: [option] });
      }
    });
    return groups;
  });

  @HostListener("window:resize")
  onWindowResize() {
    this.setDropdownWidth();
  }

  toggleIsOpen(value?: boolean): void {
    if (this.disabled()) return;

    if (value === undefined) {
      this.isOpen.update((previousValue) => !previousValue);
    } else if (value === false) {
      this.isOpen.set(value);
      this.focusTrigger();
    }
  }

  handleValueChange(event: { value: readonly string[] }): void {
    // Check if event value includes any "select-all-group" selection
    const selectedGroup = event.value
      .find((v) => v.startsWith(specialOptionControls.SELECTGROUP))
      ?.replace(specialOptionControls.SELECTGROUP, "");

    if (event.value.includes(specialOptionControls.SELECT_ALL)) {
      // If "select-all" is selected, toggle all options
      this.toggleSelectAll();
    } else if (selectedGroup) {
      // If a group selection is made, toggle the group
      this.toggleGroupSelection(selectedGroup);
    } else {
      // Otherwise, update the selected options directly
      this.selectedOptions.set(event.value);
      this.onChange(event.value);
    }

    this.onTouched();
  }

  clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedOptions.set([]);
    this.onChange([]);
    this.onTouched();
  }

  focusListboxWhenVisible = effect(() => {
    if (this.listboxRef()) this.listboxRef()?.nativeElement.focus();
  });

  focusTrigger(): void {
    this.triggerRef()?.nativeElement.focus();
  }

  isOptionSelected(option: string): boolean {
    return this.selectedOptions().includes(option);
  }

  private setDropdownWidth(): void {
    const computedWidth =
      this.hostRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this.dropdownWidth.set(computedWidth);
  }

  allOptions = computed(() => {
    return this.options()
      .filter((option) => !option.disabled())
      .map((option) => option.value());
  });

  allOptionsSelected = computed(() => {
    return this.selectedOptions().length === this.allOptions().length;
  });

  toggleSelectAll(): void {
    const newSelection = this.allOptionsSelected() ? [] : this.allOptions();

    this.selectedOptions.set(newSelection);
    this.onChange(newSelection);
  }

  getLabel(value: string): string | undefined {
    const option = this.options().find((opt) => opt.value() === value);
    return option ? option.label() : undefined;
  }

  isGroupSelected(groupLabel: string): boolean {
    const group = this.optionGroups().find((g) => g.label === groupLabel);
    if (!group) return false;

    const enabledGroupOptions = group.options
      .filter((option) => !option.disabled())
      .map((option) => option.value());

    return (
      enabledGroupOptions.length > 0 &&
      enabledGroupOptions.every((option) =>
        this.selectedOptions().includes(option),
      )
    );
  }

  toggleGroupSelection(groupLabel: string): void {
    const group = this.optionGroups().find((g) => g.label === groupLabel);
    if (!group) return;

    const enabledGroupOptions = group.options
      .filter((option) => !option.disabled())
      .map((option) => option.value());

    const allGroupOptionsSelected = this.isGroupSelected(groupLabel);

    let newSelection: readonly string[];

    if (allGroupOptionsSelected) {
      newSelection = this.selectedOptions().filter(
        (option) => !enabledGroupOptions.includes(option),
      );
    } else {
      const currentSelected = new Set(this.selectedOptions());
      enabledGroupOptions.forEach((option) => currentSelected.add(option));
      newSelection = Array.from(currentSelected);
    }

    this.selectedOptions.set(newSelection);
    this.onChange(newSelection);
  }

  deselect(event: Event, value: string): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.disabled()) return;

    const newSelection = this.selectedOptions().filter(
      (option) => option !== value,
    );
    this.selectedOptions.set(newSelection);
    this.onChange(newSelection);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  onChange: (value: readonly string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: readonly string[]): void {
    this.selectedOptions.set(value || []);
  }

  registerOnChange(fn: (value: readonly string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  ngAfterContentChecked(): void {
    this.setDropdownWidth();
  }
}
