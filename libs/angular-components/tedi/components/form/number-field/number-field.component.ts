import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
  forwardRef,
  ElementRef,
  signal,
  ViewChild,
} from "@angular/core";
import { ButtonComponent } from "../../buttons/button/button.component";
import { TediTranslationPipe } from "../../../services/translation/translation.pipe";
import { ComponentInputs } from "../../../types/inputs.type";
import { IconComponent } from "../../base/icon/icon.component";
import { TextComponent } from "../../base/text/text.component";
import { LabelComponent } from "../label/label.component";
import { FeedbackTextComponent } from "../feedback-text/feedback-text.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type NumberFieldSize = "default" | "small";

@Component({
  selector: "tedi-number-field",
  standalone: true,
  templateUrl: "./number-field.component.html",
  styleUrl: "./number-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    LabelComponent,
    ButtonComponent,
    IconComponent,
    TextComponent,
    FeedbackTextComponent,
    TediTranslationPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFieldComponent),
      multi: true,
    },
  ],
})
export class NumberFieldComponent implements ControlValueAccessor {
  /**
   * The unique identifier for the input element that this label is associated with. This ID should match the input element's id attribute to ensure accessibility.
   */
  id = input.required<string>();
  /**
   * The text content of the label that describes the input field.
   */
  label = input<string>();
  /**
   * Value of the input field. Supports two-way binding, use with form controls.
   */
  value = model<number>(0);
  /**
   * Is input disabled?
   * @default false
   */
  disabled = input<boolean>(false);
  /**
   * Indicates whether the input field is required. If set to true, the required indicator will be displayed next to the label.
   * @default false
   */
  required = input<boolean>(false);
  /**
   * Minimum allowed value. Disables decrementing below this value and restricts manual input.
   */
  min = input<number>();
  /**
   * Maximum allowed value. Disables incrementing above this value and restricts manual input.
   */
  max = input<number>();
  /**
   * Step size for incrementing or decrementing the value.
   * @default 1
   */
  step = input<number>(1);
  /**
   * Size of the number field.
   * @default default
   */
  size = input<NumberFieldSize>("default");
  /**
   * Marks the field as invalid for validation purposes.
   * @default false
   */
  invalid = input<boolean>(false);
  /**
   * Text displayed after the input value, typically a unit.
   */
  suffix = input<string>();
  /**
   * FeedbackText component inputs.
   */
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();
  /**
   * Is input full width?
   * @default false
   */
  fullWidth = input(false);

  @ViewChild("inputElement") inputRef!: ElementRef<HTMLInputElement>;

  private formDisabled = signal(false);
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isInvalid = computed(() => {
    const min = this.min();
    const max = this.max();

    return (
      this.invalid() ||
      Boolean(min !== undefined && this.value() < min) ||
      Boolean(max !== undefined && this.value() > max)
    );
  });

  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  readonly decrementDisabled = computed(() => {
    const min = this.min();

    return this.isDisabled() || (min !== undefined && this.value() <= min);
  });

  readonly incrementDisabled = computed(() => {
    const max = this.max();

    return this.isDisabled() || (max !== undefined && this.value() >= max);
  });

  writeValue(value?: number): void {
    this.value.set(value ? (isNaN(value) ? 0 : value) : 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }

  focus(): void {
    this.inputRef.nativeElement.focus();
  }

  blur(): void {
    this.inputRef.nativeElement.blur();
    this.onTouched();
  }

  handleButtonClick(action: "decrement" | "increment") {
    const delta = action === "decrement" ? -1 : 1;
    const nextValue = this.value() + this.step() * delta;
    this.value.set(nextValue);
    this.onChange(nextValue);
    this.onTouched();
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = isNaN(input.valueAsNumber) ? 0 : input.valueAsNumber;
    this.value.set(value);
    this.onChange(value);
  }

  handleBlur() {
    this.onTouched();
  }
}
