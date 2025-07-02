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
import { SelectOptionComponent } from "./select-option.component";
import { ComponentInputs } from "tedi/types/inputs.type";
import { CommonModule } from "@angular/common";

@Component({
  selector: "tedi-select",
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
  ],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-select",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
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
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

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
    this.toggleIsOpen(false);
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

  selectedLabels = computed(() => {
    return this.options()
      .filter((option) => this.isOptionSelected(option.value()))
      .map((option) => option.label());
  });

  private setDropdownWidth(): void {
    const computedWidth =
      this.hostRef?.nativeElement?.getBoundingClientRect()?.width ?? 0;
    this.dropdownWidth.set(computedWidth);
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
}
