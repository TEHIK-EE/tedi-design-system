import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ChoiceGroupDirective } from "../../choicegroup/choicegroup.directive";
import { FeedbackTextComponent } from "../../feedback-text/feedback-text.component";
import { LabelComponent } from "@tehik-ee/tedi-angular/tedi";
import { RadioGroupComponent } from "../radio-group/radio-group.component";
@Component({
  standalone: true,
  selector: "tedi-radio-card-group",
  imports: [FeedbackTextComponent, LabelComponent],
  templateUrl: "./../radio-group/radio-group.component.html",
  styleUrls: [
    "./../radio-group/radio-group.component.scss",
    "./../../choicegroup/choicegroup.styles.scss",
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
  hostDirectives: [
    {
      directive: ChoiceGroupDirective,
      inputs: ["variant", "hasIndicator", "spacing"],
    },
  ],
})
export class RadioCardGroupComponent extends RadioGroupComponent {
  /*
   * Direction in which radios flow.
   */
  override direction = input<"row" | "column">("row");
}
