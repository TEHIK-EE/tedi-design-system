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
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards";
import { DropdownItemComponent } from "community/components/overlay";
import {
  ClosingButtonComponent,
  FeedbackTextComponent,
  IconComponent,
  LabelComponent,
  TextComponent,
} from "tedi/components";
import { Select2OptionComponent } from "./select2option.component";
import { ComponentInputs } from "tedi/types/inputs.type";
import { CommonModule } from "@angular/common";
import { CheckboxComponent } from "../checkbox";
import { TagComponent } from "community/components/tags";

@Component({
  selector: "multiselect2",
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
  ],
  templateUrl: "./multiselect2.component.html",
  styleUrl: "./select2.component.scss",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-select tedi-select--multiselect",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Multiselect2Component),
      multi: true,
    },
  ],
})
export class Multiselect2Component
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
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  isOpen = signal(false);
  selectedOptions = signal<readonly string[]>([]);
  listboxRef = viewChild(CdkListbox, { read: ElementRef });
  triggerRef = viewChild(CdkOverlayOrigin, { read: ElementRef });
  hostRef = inject(ElementRef);
  options = contentChildren(Select2OptionComponent);
  dropdownWidth = signal(0);
  disabled = signal(false);

  optionGroups = computed(() => {
    const groups: { label: string; options: Select2OptionComponent[] }[] = [];
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

  // ControlValueAccessor implementation
  onChange: (value: readonly string[]) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterContentChecked(): void {
    this.setDropdownWidth();
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.setDropdownWidth();
  }

  toggleIsOpen(value?: boolean): void {
    if (this.disabled()) return;

    if (value === undefined) {
      this.isOpen.update((previousValue) => !previousValue);
    } else if (value === false) {
      this.isOpen.update(() => value);
      this.focusTrigger();
    }
  }

  handleValueChange(event: { value: readonly string[] }): void {
    this.selectedOptions.update(() => event.value);
    this.onChange(event.value);
    this.onTouched();
  }

  clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedOptions.update(() => []);
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

  // ControlValueAccessor interface implementation
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

    this.selectedOptions.update(() => newSelection);
    this.onChange(newSelection);
  }
}
