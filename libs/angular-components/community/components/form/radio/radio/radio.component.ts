import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";
import { RadioGroupComponent } from "../radio-group/radio-group.component";
import {
  ComponentInputs,
  FeedbackTextComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { generateUUID } from "../../../../../tedi/helpers/generateUUID";

export type RadioValue = string;

@Component({
  selector: "tedi-radio",
  imports: [FeedbackTextComponent],
  templateUrl: "./radio.component.html",
  styleUrl: "./radio.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-radio]": "true",
    "[class.tedi-radio--error]": "hasError() || radioGroup?.hasError()",
    "[class.tedi-radio--large]": "radioGroup?.size() === 'large'",
  },
})
export class RadioComponent implements OnInit {
  /*
   * unique id.
   */
  inputId = input.required<string>();
  /*
   * Whether radio is checked. Do not used with controlled radios.
   */
  checked = model<boolean>();
  /*
   * Radio value.
   */
  value = input.required<string>();
  /*
   * Whether radio is disabled.
   */
  disabled = input<boolean>();
  /*
   * Whether radio has error.
   */
  hasError = input<boolean>();
  /**
   * FeedbackText component inputs.
   */
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  private _inputEl = viewChild.required<ElementRef<HTMLInputElement>>("input");
  private radioGroup = inject(RadioGroupComponent, { optional: true });

  inputDisabled = computed(() => {
    return this.disabled() || this.radioGroup?.groupDisabled();
  });

  inputName = computed(() => {
    return this.radioGroup?.name();
  });

  inputChecked = computed(() => {
    return this.value() === this.radioGroup?.groupValue() || this.checked();
  });

  feedbackTextId = computed(() => {
    if (this.feedbackText()) {
      return generateUUID();
    }
    return;
  });

  focus() {
    this._inputEl().nativeElement.focus();
  }

  onInputChange(event: Event) {
    event.stopPropagation();
    this.radioGroup?.selectRadio(this.value());
  }

  ngOnInit() {
    if (this.checked()) {
      this.radioGroup?.selectRadio(this.value());
    }
  }
}
