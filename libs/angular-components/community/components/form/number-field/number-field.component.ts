import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from "@angular/core";
import { ButtonComponent } from "../../buttons/button/button.component";
import {
  IconComponent,
  InputsWithSignals,
  TextComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { NgIf } from "@angular/common";
import {
  FeedbackTextComponent,
  FeedbackTextInputs,
} from "../feedback-text/feedback-text.component";

export type NumberFieldSize = "default" | "small";
export interface NumberFieldInputs {
  /**
   * The unique identifier for the input element that this label is associated with. This ID should match the input element's id attribute to ensure accessibility.
   */
  id: string;
  /**
   * The text content of the label that describes the input field.
   */
  label: string;
  /**
   * Initial value of the input field.
   * @default 0
   */
  defaultValue: number;
  /**
   * Controlled value of the input field.
   */
  value?: number;
  /**
   * Is input disabled?
   */
  disabled?: boolean;
  /**
   * Indicates whether the input field is required. If set to true, the required indicator will be displayed next to the label.
   */
  required?: boolean;
  /**
   * Minimum allowed value. Disables decrementing below this value and restricts manual input.
   */
  min?: number;
  /**
   * Maximum allowed value. Disables incrementing above this value and restricts manual input.
   */
  max?: number;
  /**
   * Step size for incrementing or decrementing the value.
   * @default 1
   */
  step: number;
  /**
   * Size of the number field.
   * @default default
   */
  size: NumberFieldSize;
  /**
   * Marks the field as invalid for validation purposes.
   */
  invalid?: boolean;
  /**
   * Text displayed after the input value, typically a unit.
   */
  suffix?: string;
  /**
   * Whether the number field occupies the full width of its container.
   */
  fullWidth?: boolean;
  /**
   * FeedbackText component inputs.
   */
  feedbackText?: FeedbackTextInputs;
}

@Component({
  selector: "tedi-number-field",
  standalone: true,
  templateUrl: "./number-field.component.html",
  styleUrl: "./number-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgIf,
    ButtonComponent,
    IconComponent,
    TextComponent,
    FeedbackTextComponent,
  ],
})
export class NumberFieldComponent
  implements InputsWithSignals<NumberFieldInputs>
{
  id = input.required<string>();
  label = input.required<string>();
  defaultValue = input<number>(0);
  value = model<number>();
  disabled = input<boolean>();
  required = input<boolean>();
  min = input<number>();
  max = input<number>();
  step = input<number>(1);
  size = input<NumberFieldSize>("default");
  invalid = input<boolean>();
  suffix = input<string>();
  fullWidth = input<boolean>();
  feedbackText = input<FeedbackTextInputs>();

  readonly currentValue = computed(() => this.value() ?? this.defaultValue());

  readonly isInvalid = computed(() => {
    const min = this.min();
    const max = this.max();

    return (
      this.invalid() ||
      Boolean(min !== undefined && this.currentValue() < min) ||
      Boolean(max !== undefined && this.currentValue() > max)
    );
  });

  readonly decrementDisabled = computed(() => {
    const min = this.min();
    return this.disabled() || (min !== undefined && this.currentValue() <= min);
  });

  readonly incrementDisabled = computed(() => {
    const max = this.max();
    return this.disabled() || (max !== undefined && this.currentValue() >= max);
  });

  updateValue(action: "decrement" | "increment") {
    const delta = action === "decrement" ? -1 : 1;
    const nextValue = this.currentValue() + this.step() * delta;
    this.setValueWithinBounds(nextValue);
  }

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const parsed = parseFloat(input.value);

    if (!isNaN(parsed)) {
      this.setValueWithinBounds(parsed);
    }
  }

  private setValueWithinBounds(newValue: number) {
    const value = Math.min(
      this.max() ?? Infinity,
      Math.max(this.min() ?? -Infinity, newValue),
    );

    this.value.set(value);
  }
}
