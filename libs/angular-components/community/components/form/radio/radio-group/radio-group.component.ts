import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FeedbackTextComponent } from "../../feedback-text/feedback-text.component";
import { RadioValue } from "../radio/radio.component";
import { ComponentInputs, LabelComponent } from "@tehik-ee/tedi-angular/tedi";

export type RadioGroupSize = "default" | "large";

@Component({
  selector: "tedi-radio-group",
  standalone: true,
  imports: [FeedbackTextComponent, LabelComponent],
  templateUrl: "./radio-group.component.html",
  styleUrl: "./radio-group.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  host: {
    "[class.tedi-radio-group]": "true",
    "[attr.role]": "'radiogroup'",
  },
})
export class RadioGroupComponent implements ControlValueAccessor {
  /*
   * Radio group name
   */
  name = input.required<string>();
  /*
   * Radio group id.
   */
  id = input.required<string>();
  /**
   * Radio group label.
   */
  label = input<string>();
  /*
   * Whether radio group is disabled. Do not use with controlled radios.
   */
  disabled = input<boolean>();
  /*
   * Whether radio group has error.
   */
  hasError = input<boolean>();
  /*
   * Size of the radios radios in group.
   */
  size = input<RadioGroupSize>("default");
  /*
   * Direction in which radios flow.
   */
  direction = input<"row" | "column">("column");
  /*
   * Spacing between radios. unit: px.
   * @default 4
   */
  spacing = input<number>(4);
  /**
   * FeedbackText component inputs.
   */
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  /*
   * Emits selected radio value on change.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  change = output<RadioValue>();

  private _value = signal<string | null>(null);
  private _controlDisabled = signal<boolean>(false);

  groupDisabled = computed(() => {
    return this.disabled() || this._controlDisabled();
  });
  groupValue = this._value.asReadonly();

  private _onChange: (val: RadioValue) => void = () => {};
  private _onTouched: (val: boolean) => void = () => {};

  writeValue(value: RadioValue | null): void {
    this._value.set(value);
  }
  registerOnChange(fn: (val: RadioValue) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: (val: boolean) => void): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._controlDisabled.set(isDisabled);
  }

  selectRadio(value: string) {
    this._onChange(value);
    this.change.emit(value);
  }
}
