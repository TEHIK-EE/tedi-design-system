import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  model,
  ViewEncapsulation,
} from "@angular/core";
import { ButtonComponent } from "../../buttons/button/button.component";
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";
import { NgIf } from "@angular/common";

export type NumberFieldSize = "default" | "small";
export interface NumberFieldInputs {
  /**
   * The unique identifier for the input element that this label is associated with. This ID should match the input element's id attribute to ensure accessibility.
   */
  id: InputSignal<string>;
  /**
   * The text content of the label that describes the input field.
   */
  label: InputSignal<string>;
  /**
   * Is input disabled?
   */
  disabled: InputSignal<boolean | undefined>;
  /**
   * Controlled value of the input field.
   */
  value: InputSignal<number | undefined>;
  /**
   * Initial value of the input field.
   */
  defaultValue: InputSignal<number>;
  /**
   * Minimum allowed value. Disables decrementing below this value and restricts manual input.
   */
  min: InputSignal<number | undefined>;
  /**
   * Maximum allowed value. Disables incrementing above this value and restricts manual input.
   */
  max: InputSignal<number | undefined>;
  /**
   * Step size for incrementing or decrementing the value.
   * @default 1
   */
  step: InputSignal<number>;
  /**
   * Size of the number field.
   */
  size: InputSignal<NumberFieldSize>;
  /**
   * Marks the field as invalid for validation purposes.
   */
  invalid: InputSignal<boolean | undefined>;
  /**
   * Text displayed after the input value, typically a unit.
   */
  suffix: InputSignal<string | undefined>;
  /**
   * Whether the number field occupies the full width of its container.
   */
  fullWidth: InputSignal<boolean | undefined>;
  /**
   * Helper text displayed below the input.
   */
  helper: InputSignal<string | undefined>;
  /**
   * Indicates whether the input field is required. If set to true, the required indicator (if provided) will be displayed next to the label.
   */
  required: InputSignal<boolean | undefined>;
}

@Component({
  selector: "tedi-number-field",
  standalone: true,
  templateUrl: "./number-field.component.html",
  styleUrl: "./number-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgIf, ButtonComponent, IconComponent, TextComponent],
})
export class NumberFieldComponent implements NumberFieldInputs {
  id = input.required<string>();
  label = input.required<string>();
  disabled = input<boolean>();
  min = input<number>();
  max = input<number>();
  step = input<number>(1);
  size = input<NumberFieldSize>("default");
  invalid = input<boolean>();
  suffix = input<string>();
  fullWidth = input<boolean>();
  helper = input<string>();
  required = input<boolean>();

  defaultValue = input<number>(0);
  value = model<number>();

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

  handleInputChange(value: string) {
    const parsed = parseFloat(value);

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
