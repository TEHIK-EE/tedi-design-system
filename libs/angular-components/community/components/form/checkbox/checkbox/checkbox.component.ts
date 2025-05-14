import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  OnInit,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ComponentInputs, IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { FeedbackTextComponent } from "../../feedback-text/feedback-text.component";
import { CheckboxCardGroupComponent } from "../checkbox-card-group/checkbox-card-group.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CheckboxGroupComponent } from "../checkbox-group/checkbox-group.component";

export type CheckboxSize = "default" | "large";

@Component({
  standalone: true,
  selector: "tedi-checkbox",
  imports: [FeedbackTextComponent, IconComponent],
  templateUrl: "./checkbox.component.html",
  styleUrl: "./checkbox.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  host: {
    "[class.tedi-checkbox]": "true",
    "[class.tedi-checkbox--error]": "hasError() || cardGroup?.hasError()",
    "[class.tedi-checkbox--large]": "checkboxSize() === 'large'",
  },
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  /*
   * unique id.
   */
  inputId = input.required<string>();
  /*
   * Whether checkbox is checked. Do not used with controlled checkboxes.
   */
  checked = model<boolean | null>(null);
  /*
   * Whether checkbox is indeterminate.
   */
  indeterminate = input<boolean>();
  /*
   * Checkbox value. For use in checkbox card group
   */
  value = input<string>();
  /*
   * Whether checkbox is disabled.
   */
  disabled = model<boolean>();
  /*
   * Size of the checkbox. Overwrites group size.
   */
  size = input<CheckboxSize>();
  /*
   * Whether checkbox has error.
   */
  hasError = input<boolean>();
  /**
   * FeedbackText component inputs.
   */
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  private _inputEl = viewChild.required<ElementRef<HTMLInputElement>>("input");
  private checkboxGroup = inject(CheckboxGroupComponent, { optional: true });
  private checkboxCardGroup = inject(CheckboxCardGroupComponent, {
    optional: true,
  });

  private _onChange: (val: boolean) => void = () => {};
  _onTouched: () => void = () => {};

  feedbackTextId = computed(() => {
    if (this.feedbackText()) {
      return crypto.randomUUID();
    }
    return;
  });

  indicatorIcon = computed(() => {
    if (this.indeterminate()) {
      return "remove";
    }
    if (this.checked()) {
      return "check";
    }
    return;
  });

  checkboxSize = computed(() => {
    return this.size() ?? this.checkboxGroup?.size();
  });

  iconSize = computed(() => {
    return this.checkboxSize() === "large" ? 18 : 16;
  });

  checkboxDisabled = computed(() => {
    return this.disabled() || this.checkboxGroup?.groupDisabled();
  });

  focus() {
    this._inputEl().nativeElement.focus();
  }

  writeValue(value: boolean | null): void {
    this.checked.set(value);
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInputChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this._onChange(checked);
    this.checked.set(checked);
    this.checkboxCardGroup?.onCheckboxChange(checked, this.value()!);
  }

  ngOnInit() {
    if (this.checked()) {
      this._onChange(true);
    }
  }
}
