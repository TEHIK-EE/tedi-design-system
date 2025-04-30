import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { FeedbackTextComponent } from "../../feedback-text/feedback-text.component";
import { LabelComponent } from "../../label/label.component";
import { RadioGroupComponent } from "../radio-group/radio-group.component";

type RadioCardVariant = "primary" | "secondary";

@Component({
  standalone: true,
  selector: "tedi-radio-card-group",
  imports: [FeedbackTextComponent, LabelComponent],
  templateUrl: "./../radio-group/radio-group.component.html",
  styleUrls: [
    "./../radio-group/radio-group.component.scss",
    "./radio-card-group.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioCardGroupComponent),
      multi: true,
    },
    // Necessary for DI in RadioComponent
    {
      provide: RadioGroupComponent,
      useExisting: RadioCardGroupComponent,
    },
  ],
  host: {
    "[class.tedi-radio-card-group]": "true",
    "[class.tedi-radio-card-group--stacked]": "spacing() === 0",
    "[class.tedi-radio-card-group--plain]": "!hasIndicator()",
    "[class]": "modifierClasses()",
  },
})
export class RadioCardGroupComponent extends RadioGroupComponent {
  /*
   * Variant of the radio cards radios in group.
   */
  variant = input<RadioCardVariant>("primary");
  /*
   * Whether radio card has indicator
   */
  hasIndicator = input<boolean>(true);
  /*
   * Direction in which radios flow.
   */
  override direction = input<"row" | "column">("row");

  modifierClasses = computed(() => {
    return `tedi-radio-card-group--${this.variant()}`;
  });
}
